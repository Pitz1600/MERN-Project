from flask import Flask, request, jsonify
from flask_cors import CORS
from main import main_function  # Import the main_function from main.py

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:5174"]}})

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    try:
        # Call the main_function from main.py
        result = main_function(text)
        return jsonify(result)  # Ensure the result is returned as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)