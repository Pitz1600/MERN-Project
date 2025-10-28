from flask import Flask, request, jsonify
from flask_cors import CORS
from main import main_function  # Import the main_function from main.py
import traceback
import time

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
        text_list = text.split(".")
        results = []
        for sentence in text_list:
            result = main_function(sentence)
            results.append(result) # Ensure the result is returned as JSON     
        return jsonify(results)
    
    except Exception as e:
        # Print full traceback to the server console for debugging
        print("Exception during /analyze:\n", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)