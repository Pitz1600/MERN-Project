import ollama
from pydantic import BaseModel
import json
from src.model.sentiment_model import Sentiment

def neutral_correction(text):
    prompt = """
    You are a text neutralization assistant.

    Your task:
    - Change this text into a neutral version.
    - Do not add opinions, emotions, or exaggerations.
    - Keep the core meaning intact.
    - When explaining, use simple, clear English so anyone can understand.
    - A lower sentiment score (closer to 0) indicates more neutrality.

    Output must strictly follow this format:
    original_text: "write here the original text"
    words_detected: None
    correction: None
    sentiment_score: "write here the sentiment score"
    reason_of_correction: "No correction needed."

    Example:
    Input: The sky is blue.
    Output:
    original_text: "The sky is blue."
    words_detected: None
    correction: None
    sentiment_score: "0.0" 
    reason_of_correction: "No correction needed."
    """
    response = ollama.chat(
        messages=[
            {
                "role":"system",
                "content":prompt,
            },
            {
                "role":"user",
                "content": f'Sentence: "{text}"',
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )

    return response["message"]["content"]