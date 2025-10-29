import ollama
from pydantic import BaseModel
import json
from src.model.grammar_model import Grammar
import ast

def split_sentence(text):
    
    response = ollama.chat(
        messages=[
            {
                "role":"user",
                "content": f'Accept UK and US based English. Split the text into correct sentences. Output only a list of the sentences. Strictly do not modify anything in the text: "{text}"',
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )
    sentences = ast.literal_eval(response["message"]["content"])
    return sentences