import argparse
import os

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

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

NUMERIC_FEATURES = [
    "Total_Income",
    "Total_Family_Members",
    "Applicant_Age",
    "Years_of_Working",
    "Total_Bad_Debt",
]

TARGET_CANDIDATES = [
    "Approved",
    "approved",
    "Credit_Approved",
    "credit_approved",
    "target",
    "label",
    "y",
]


def infer_target_column(df):
    for candidate in TARGET_CANDIDATES:
        if candidate in df.columns:
            return candidate
    raise ValueError(
        f"Target column not found. Tried: {TARGET_CANDIDATES}. Available columns: {list(df.columns)}"
    )


def build_pipeline():
    preprocess = ColumnTransformer(
        transformers=[
            (
                "cat",
                Pipeline(
                    steps=[
                        ("imputer", SimpleImputer(strategy="most_frequent")),
                        ("onehot", OneHotEncoder(handle_unknown="ignore")),
                    ]
                ),
                CATEGORICAL_FEATURES,
            ),
            (
                "num",
                Pipeline(
                    steps=[
                        ("imputer", SimpleImputer(strategy="median")),
                        ("scaler", StandardScaler()),
                    ]
                ),
                NUMERIC_FEATURES,
            ),
        ]
    )

    return Pipeline(
        steps=[
            ("preprocess", preprocess),
            (
                "model",
                LogisticRegression(
                    max_iter=4000,
                    class_weight="balanced",
                    random_state=42,
                ),
            ),
        ]
    )


def main():
    parser = argparse.ArgumentParser(description="Train CredX v2 model")
    parser.add_argument(
        "--data",
        default=os.path.join(os.path.dirname(__file__), "training_data.csv"),
        help="Path to training csv",
    )
    parser.add_argument(
        "--out",
        default=os.path.join(os.path.dirname(__file__), "credx_model_v2.pkl"),
        help="Output model path",
    )
    args = parser.parse_args()

    if not os.path.exists(args.data):
        raise FileNotFoundError(
            f"Training data not found at {args.data}. Place your csv there or pass --data."
        )

    df = pd.read_csv(args.data)
    target_col = infer_target_column(df)

    missing = [c for c in FEATURE_NAMES if c not in df.columns]
    if missing:
        raise ValueError(f"Missing required feature columns: {missing}")

    X = df[FEATURE_NAMES].copy()
    for col in CATEGORICAL_FEATURES:
        X[col] = X[col].astype(str)

    y = pd.to_numeric(df[target_col], errors="coerce").fillna(0).astype(int)

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    pipeline = build_pipeline()
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    y_proba = pipeline.predict_proba(X_test)[:, 1]

    print("Model performance (holdout):")
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print(f"F1: {f1_score(y_test, y_pred):.4f}")
    print(f"ROC-AUC: {roc_auc_score(y_test, y_proba):.4f}")

    joblib.dump(pipeline, args.out)
    print(f"Saved model to: {args.out}")


if __name__ == "__main__":
    main()
