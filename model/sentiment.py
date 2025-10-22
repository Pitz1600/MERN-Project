from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = Flask(__name__)
CORS(app)

# Load model directly
model_name = "tabularisai/multilingual-sentiment-analysis"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

def predict_sentiment(texts):
    inputs = tokenizer(texts, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
    sentiment_map = {0: "Very Negative", 1: "Negative", 2: "Neutral", 3: "Positive", 4: "Very Positive"}
    return [sentiment_map[p] for p in torch.argmax(probabilities, dim=-1).tolist()]

@app.route('/', methods=['GET'])
def home():
    return "Sentiment Analysis API is running."

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get('text', '')
    text_list = text.split(".")
    sentiments = predict_sentiment(text_list)
    result = [{"text": t, "sentiment": s} for t, s in zip(text_list, sentiments)]
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
