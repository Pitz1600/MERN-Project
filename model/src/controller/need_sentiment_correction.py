import ollama
from pydantic import BaseModel
import json
from src.model.grammar_model import Grammar

def need_sentiment_correction(text):
    
    response = ollama.chat(
        messages=[
            {
                "role":"user",
                "content": f'Accept both UK and US English. Evaluate only the neutrality of the provided text. Do not analyse grammar, spelling, or tone except where they introduce bias. Determine whether the text contains any subjective, emotional, judgemental, derogatory, or persuasive language. If the text is not fully neutral, respond: "Yes". If the text is fully neutral, respond: "No". Respond only with Yes or No — no explanation. text: "{text}"',
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )

    return response["message"]["content"].lower()