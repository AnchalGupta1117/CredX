from flask import Flask, request, jsonify
import os
import sys
import json
from flask_cors import CORS
from subprocess import Popen, PIPE

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PREDICT_SCRIPT = os.path.join(BASE_DIR, "predict.py")

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.get_json()
    print("Request received")

    # Save input data to a temporary file if needed
    input_json = json.dumps(input_data, separators=(',', ':'))

    print(input_json)

    try:
        process = Popen(
            [sys.executable, PREDICT_SCRIPT, input_json],
            stdout=PIPE,
            stderr=PIPE,
            cwd=BASE_DIR,
            text=True
        )
        stdout, stderr = process.communicate()
        if process.returncode != 0:
            print(f"Error running Python script: {stderr}")
            return jsonify({"prediction": "error predicting results", "stderror": stderr}), 500

        print(stdout)
        output_lines = [line.strip() for line in stdout.splitlines() if line.strip()]
        if len(output_lines) < 2:
            return jsonify({"prediction": "error predicting results", "stderror": "Unexpected predictor output"}), 500

        prediction = output_lines[0]
        probability = output_lines[1]
        return jsonify({"prediction": prediction, "probability": probability})
    except Exception as e:
        print(e)
        return jsonify({"prediction": "error predicting results", "error": str(e)}), 500

if __name__ == '__main__':
    port = 3001
    app.run(host='0.0.0.0',port=port, debug=True)
