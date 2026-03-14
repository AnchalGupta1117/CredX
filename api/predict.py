import json
import os
from http.server import BaseHTTPRequestHandler

import joblib
import pandas as pd


FEATURE_NAMES = [
    "Applicant_Gender",
    "Owned_Realty",
    "Total_Income",
    "Income_Type",
    "Education_Type",
    "Housing_Type",
    "Job_Title",
    "Total_Family_Members",
    "Applicant_Age",
    "Years_of_Working",
    "Total_Bad_Debt",
]

CATEGORICAL_FEATURES = [
    "Applicant_Gender",
    "Owned_Realty",
    "Income_Type",
    "Education_Type",
    "Housing_Type",
    "Job_Title",
]

MODEL = None


def get_model():
    global MODEL
    if MODEL is None:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        v2_path = os.path.join(base_dir, "..", "backend", "credx_model_v2.pkl")
        legacy_path = os.path.join(base_dir, "..", "backend", "credx_model.pkl")
        model_path = v2_path if os.path.exists(v2_path) else legacy_path
        MODEL = joblib.load(model_path)
    return MODEL


def create_input_df(values):
    input_df = pd.DataFrame([values], columns=FEATURE_NAMES)
    for col in CATEGORICAL_FEATURES:
        input_df[col] = input_df[col].astype(str)
    return input_df


def get_approved_probability(model, input_df):
    probabilities = model.predict_proba(input_df)[0]
    classes = list(model.classes_)

    approved_idx = 1 if len(classes) > 1 else 0
    for idx, cls in enumerate(classes):
        cls_text = str(cls).lower()
        if cls_text in {"1", "true", "approved", "yes"}:
            approved_idx = idx
            break

    return float(probabilities[approved_idx])


def apply_risk_adjustment(raw_probability, values):
    # values order follows FEATURE_NAMES
    total_income = float(values[2])
    applicant_age = float(values[8])
    years_of_working = float(values[9])
    total_bad_debt = float(values[10])

    multiplier = 1.0

    # Strongest business signal
    if total_bad_debt >= 1:
        multiplier *= 0.75
    if total_bad_debt >= 3:
        multiplier *= 0.75
    if total_bad_debt >= 5:
        multiplier *= 0.75
    if total_bad_debt >= 10:
        multiplier *= 0.65

    # Income effect
    if total_income < 150000:
        multiplier *= 0.85
    if total_income < 80000:
        multiplier *= 0.8

    # Stability effect
    if years_of_working <= 0:
        multiplier *= 0.9

    # Extreme age range effect
    if applicant_age < 21 or applicant_age > 70:
        multiplier *= 0.9

    adjusted = max(0.0, min(1.0, raw_probability * multiplier))
    return float(adjusted)


def build_risk_flags(values):
    total_income = float(values[2])
    total_family_members = float(values[7])
    applicant_age = float(values[8])
    years_of_working = float(values[9])
    total_bad_debt = float(values[10])

    flags = []

    if total_bad_debt >= 1:
        flags.append("Bad debt history present")
    if total_bad_debt >= 5:
        flags.append("High bad debt count")

    if total_income < 150000:
        flags.append("Low annual income")
    if total_income < 80000:
        flags.append("Very low annual income")

    if years_of_working <= 0:
        flags.append("No work experience")

    if applicant_age < 21:
        flags.append("Very young credit profile")
    if applicant_age > 70:
        flags.append("Senior age risk profile")

    if total_family_members >= 8:
        flags.append("Large household size")

    if not flags:
        flags.append("No major risk flag from rule checks")

    return flags


def build_model_directions(model):
    if hasattr(model, "coef_"):
        coefficients = model.coef_[0]
        if len(coefficients) != len(FEATURE_NAMES):
            return []

        directions = []
        for feature, coef in zip(FEATURE_NAMES, coefficients):
            directions.append(
                {
                    "feature": feature,
                    "direction": "increases_approval" if coef >= 0 else "decreases_approval",
                    "weight": float(coef),
                }
            )
        return directions

    if hasattr(model, "named_steps") and "model" in model.named_steps:
        estimator = model.named_steps["model"]
        if not hasattr(estimator, "coef_"):
            return []

        try:
            transformed_names = model.named_steps["preprocess"].get_feature_names_out()
        except Exception:
            return []

        coefficients = estimator.coef_[0]
        if len(coefficients) != len(transformed_names):
            return []

        ranked = sorted(
            zip(transformed_names, coefficients),
            key=lambda item: abs(item[1]),
            reverse=True,
        )

        return [
            {
                "feature": str(feature),
                "direction": "increases_approval" if coef >= 0 else "decreases_approval",
                "weight": float(coef),
            }
            for feature, coef in ranked[:15]
        ]

    return []


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status_code, payload):
        response = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(response)

    def do_OPTIONS(self):
        self._send_json(200, {"ok": True})

    def do_POST(self):
        try:
            content_length = int(self.headers.get("content-length", 0))
            raw_body = self.rfile.read(content_length) if content_length > 0 else b""
            if not raw_body:
                self._send_json(400, {"error": "Empty request body"})
                return

            parsed = json.loads(raw_body.decode("utf-8"))

            # Frontend sends list payload. Keep object fallback for compatibility.
            if isinstance(parsed, list):
                values = parsed
            elif isinstance(parsed, dict) and isinstance(parsed.get("payload"), list):
                values = parsed["payload"]
            elif isinstance(parsed, dict) and all(k in parsed for k in FEATURE_NAMES):
                values = [parsed[key] for key in FEATURE_NAMES]
            else:
                self._send_json(400, {"error": "Invalid payload format"})
                return

            if len(values) != len(FEATURE_NAMES):
                self._send_json(
                    400,
                    {
                        "error": f"Expected {len(FEATURE_NAMES)} fields, got {len(values)}"
                    },
                )
                return

            model = get_model()
            input_df = create_input_df(values)
            prediction = model.predict(input_df)[0]
            probability = get_approved_probability(model, input_df)
            adjusted_probability = apply_risk_adjustment(probability, values)
            risk_flags = build_risk_flags(values)
            model_directions = build_model_directions(model)

            self._send_json(
                200,
                {
                    "prediction": str(prediction),
                    "probability": adjusted_probability,
                    "raw_probability": probability,
                    "risk_flags": risk_flags,
                    "model_directions": model_directions,
                },
            )
        except Exception as error:
            self._send_json(
                500,
                {
                    "prediction": "error predicting results",
                    "error": str(error),
                },
            )
