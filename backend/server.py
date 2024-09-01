from flask import Flask, request, jsonify
import subprocess
import json
from flask_cors import CORS
from subprocess import Popen, PIPE

app = Flask(__name__)
CORS(app)

# Install dependencies
def install_dependencies():
    print("Installing libraries")
    try:
        result = subprocess.check_output(
            ["pip", "install", "numpy", "pandas", "joblib", "scikit-learn"],
            stderr=subprocess.STDOUT
        )
        print(f"Python dependencies installed: {result.decode()}")
    except subprocess.CalledProcessError as error:
        print(f"Error installing Python dependencies: {error.output.decode()}")

install_dependencies()

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.get_json()
    print("Request received")

    # Save input data to a temporary file if needed
    input_json = json.dumps(input_data,separators=(',', ':'))

    print(input_json)

    try:
        process = Popen(
            ['python', 'predict.py', input_json],
            stdout=PIPE,
            stderr=PIPE,
            text=True
        )
        stdout, stderr = process.communicate()
        if stderr:
            print(f"Error running Python script: {stderr}")
            return jsonify({"prediction": "error predicting results", "stderror": stderr}), 500

        print(stdout)
        # Assuming the prediction is on the third line
        prediction = stdout.splitlines()[0] if len(stdout.splitlines()) > 1 else "Error"
        probability = stdout.splitlines()[1] if len(stdout.splitlines()) > 1 else "Error"
        return jsonify({"prediction": prediction, "probability" : probability})
    except Exception as e:
        print(e)
        return jsonify({"prediction": "error predicting results", "error": e}), 500

if __name__ == '__main__':
    port = 3001
    app.run(host='0.0.0.0',port=port, debug=True)
