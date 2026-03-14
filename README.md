Check it out at: https://cred-x.vercel.app/predict-approval

## Improve prediction quality (recommended)

If you want stronger and more reliable relation between form inputs and result, retrain the v2 model.

### 1) Prepare training data

Create this file:

- [backend/training_data.csv](backend/training_data.csv)

Required feature columns:

- `Applicant_Gender`
- `Owned_Realty`
- `Total_Income`
- `Income_Type`
- `Education_Type`
- `Housing_Type`
- `Job_Title`
- `Total_Family_Members`
- `Applicant_Age`
- `Years_of_Working`
- `Total_Bad_Debt`

Target column can be any one of:

- `Approved` / `approved` / `Credit_Approved` / `credit_approved` / `target` / `label` / `y`

### 2) Train v2 pipeline model

Run from project root:

- `python backend/train_model.py`

This creates:

- [backend/credx_model_v2.pkl](backend/credx_model_v2.pkl)

### 3) Deploy

Push and redeploy. API automatically prefers `credx_model_v2.pkl` and falls back to `credx_model.pkl` if v2 is missing.
