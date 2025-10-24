import ollama
from pydantic import BaseModel
import json
from src.model.grammar_model import Grammar

def need_sentiment_correction(text):
    
    response = ollama.chat(
        messages=[
            {
                "role":"user",
                "content": f'Accept UK and US based english. Does this text need editing in order for it to be neutral? Respond only with yes or no. text: "{text}"',
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )

    return response["message"]["content"].lower()