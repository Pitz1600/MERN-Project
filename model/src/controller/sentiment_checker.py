import ollama
from pydantic import BaseModel
import json
from src.model.sentiment_model import Sentiment

def sentiment_correction(text):
    prompt = """
    You are a text neutralization assistant.

    Your task:
    - Change this text into a neutral version.
    - Do not add opinions, emotions, or exaggerations.
    - Keep the core meaning intact.
    - When explaining, use simple, clear English so anyone can understand.
    - A higher sentiment score (closer to 1) indicates more positive bias.
    - A lower sentiment score (closer to -1) indicates more negative bias.

    Output must strictly follow this format:
    original_text: "write here the original text"
    words_detected: "writes here the words with mistakes"
    correction: "write here the complete neutral version"
    sentiment_score: "write here the sentiment score"
    reason_of_correction: "write here the reason for neutralization"

    Example:
    Input: The service at this restaurant was absolutely amazing, and the food was incredible!
    Output:
    original_text: "The service at this restaurant was absolutely amazing, and the food was incredible!"
    words_detected: "absolutely amazing, incredible"
    correction: "The restaurant provided good service, and the food met expectations."
    sentiment_score: "0.80"
    reason_of_correction: "Emotional words like 'absolutely amazing' and 'incredible' were replaced with neutral language to express the speaker’s satisfaction in a factual way."
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