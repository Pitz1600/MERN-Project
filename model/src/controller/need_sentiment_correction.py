import ollama
from pydantic import BaseModel
import json
from src.model.grammar_model import Grammar

def need_sentiment_correction(text):
    
    response = ollama.chat(
        messages=[
            {
                "role":"user",
                "content": f'Accept UK and US based english. What is the sentiment of the text? Respond only with positive, negative, or neutral. text: "{text}"',
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )

    return response["message"]["content"].lower()