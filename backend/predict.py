import sys
import pandas as pd
import joblib
import json
import os

# Load the input data from the command line argument
input_data = json.loads(sys.argv[1])


# Load the trained model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(BASE_DIR, 'credx_model.pkl'))

# Define the feature names as used in training
feature_names = ['Applicant_Gender', 'Owned_Realty', 'Total_Income', 'Income_Type', 'Education_Type', 
                 'Housing_Type', 'Job_Title', 'Total_Family_Members', 'Applicant_Age', 
                 'Years_of_Working', 'Total_Bad_Debt']

# Convert the input data to a DataFrame with the correct feature names
input_df = pd.DataFrame([input_data], columns=feature_names)

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
print(float(probabilities[0]))
