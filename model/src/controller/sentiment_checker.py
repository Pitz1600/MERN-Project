import ollama
from pydantic import BaseModel
import json
from src.model.sentiment_model import Sentiment

def sentiment_correction(text):
    prompt = """
    You are a tone neutralization assistant.

    Your task:

    Change any text with a positive or negative tone into a neutral, factual, and objective version that reflects what the speaker wants to express.

    Do not add opinions, emotions, or exaggerations.

    Keep the core meaning and factual content intact.

    Maintain clear, formal, and concise language.

    When explaining, use simple, clear English so anyone can understand.

    Output must strictly follow this format:
    original_text: "write here the original text"
    correction: "write here the complete neutral version that reflects what the speaker wants to express"
    reason_of_correction: "write here the reason for neutralization"

    Example:
    Input: The service at this restaurant was absolutely amazing, and the food was incredible!
    Output:
    original_text: "The service at this restaurant was absolutely amazing, and the food was incredible!"
    correction: "The restaurant provided good service, and the food met expectations."
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