import sys
import pandas as pd
import joblib
import json
import numpy as np

# Load the input data from the command line argument
input_data = json.loads(sys.argv[1])


# Load the trained model
model = joblib.load('credx_model.pkl')

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

# To get the probability estimates for the positive class (lung cancer)
probabilities = model.predict_proba(input_df)[:, 1]
print(probabilities[0])
