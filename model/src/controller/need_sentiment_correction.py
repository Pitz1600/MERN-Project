import ollama
from pydantic import BaseModel
import json
from src.model.grammar_model import Grammar

def need_sentiment_correction(text, words_detected):
    prompt="""
    You will receive a text with this format:
    text:
    words_detected:

    Accept both UK and US English. Evaluate only the neutrality or bias of the provided text. Do not analyse grammar, spelling, or tone except where they introduce bias.
    Internally score the sentiment of text from -1 to +1, where -1 is extremely negatively biased, 0 is fully neutral, and +1 is extremely positively biased.
    If there are words in the words_detected, respond immediately with "Yes". Otherwise, analyse the text.
    If the sentiment score is 0, respond "No". If the score is anything other than 0, respond "Yes".
    Respond only with Yes or No — no explanation.
    """
    
    response = ollama.chat(
        messages=[
            {
                "role":"system",
                "content":prompt
            },
            {
                "role":"user",
                "content": f"""
                text:{text}
                words_detected: {words_detected}
                """,
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )

    return response["message"]["content"].lower()