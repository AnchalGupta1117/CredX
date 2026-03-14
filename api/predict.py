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

MODEL = None


def get_model():
    global MODEL
    if MODEL is None:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, "..", "backend", "credx_model.pkl")
        MODEL = joblib.load(model_path)
    return MODEL


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
            input_df = pd.DataFrame([values], columns=FEATURE_NAMES)
            prediction = model.predict(input_df)[0]
            probability = get_approved_probability(model, input_df)

            self._send_json(
                200,
                {
                    "prediction": str(prediction),
                    "probability": probability,
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
