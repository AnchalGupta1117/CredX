import sys
import pandas as pd
import joblib
import json
import os

# Load the input data from the command line argument
input_data = json.loads(sys.argv[1])


# Load the trained model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
v2_model_path = os.path.join(BASE_DIR, 'credx_model_v2.pkl')
legacy_model_path = os.path.join(BASE_DIR, 'credx_model.pkl')
model = joblib.load(v2_model_path if os.path.exists(v2_model_path) else legacy_model_path)

# Define the feature names as used in training
feature_names = ['Applicant_Gender', 'Owned_Realty', 'Total_Income', 'Income_Type', 'Education_Type', 
                 'Housing_Type', 'Job_Title', 'Total_Family_Members', 'Applicant_Age', 
                 'Years_of_Working', 'Total_Bad_Debt']

categorical_features = [
    'Applicant_Gender',
    'Owned_Realty',
    'Income_Type',
    'Education_Type',
    'Housing_Type',
    'Job_Title',
]

# Convert the input data to a DataFrame with the correct feature names
input_df = pd.DataFrame([input_data], columns=feature_names)
for col in categorical_features:
    input_df[col] = input_df[col].astype(str)

# Predict using the trained model
predictions = model.predict(input_df)

# Print the prediction
print(predictions[0])

# To get the probability estimates for the approved/positive class
classes = list(model.classes_)
approved_idx = 1 if len(classes) > 1 else 0

for idx, cls in enumerate(classes):
    cls_text = str(cls).lower()
    if cls_text in {"1", "true", "approved", "yes"}:
        approved_idx = idx
        break

probabilities = model.predict_proba(input_df)[:, approved_idx]
raw_probability = float(probabilities[0])

# Risk-adjusted business layer for more intuitive lending outcomes
total_income = float(input_data[2])
applicant_age = float(input_data[8])
years_of_working = float(input_data[9])
total_bad_debt = float(input_data[10])

multiplier = 1.0

if total_bad_debt >= 1:
    multiplier *= 0.75
if total_bad_debt >= 3:
    multiplier *= 0.75
if total_bad_debt >= 5:
    multiplier *= 0.75
if total_bad_debt >= 10:
    multiplier *= 0.65

if total_income < 150000:
    multiplier *= 0.85
if total_income < 80000:
    multiplier *= 0.8

if years_of_working <= 0:
    multiplier *= 0.9

if applicant_age < 21 or applicant_age > 70:
    multiplier *= 0.9

adjusted_probability = max(0.0, min(1.0, raw_probability * multiplier))
print(float(adjusted_probability))
