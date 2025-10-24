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

    Output must strictly follow this format:
    Original_Text: "write here the original text"
    Words_detected: "write here the biased words"
    Suggested_text: "write here the complete neutral version"
    Reason_for_correction: "write here the reason for neutralization"

    Example:
    Input: The service at this restaurant was absolutely amazing, and the food was incredible!
    Output:
    Original_Text: "The service at this restaurant was absolutely amazing, and the food was incredible!"
    Words_detected: "absolutely amazing, incredible"
    Suggested_text: "The restaurant provided good service, and the food met expectations."
    Reason_for_correction: "Emotional words like 'absolutely amazing' and 'incredible' were replaced with neutral language to express the speaker’s satisfaction in a factual way."
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