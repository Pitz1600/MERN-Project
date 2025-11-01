import ollama
from pydantic import BaseModel
import json
from src.model.grammar_model import Grammar

def need_sentiment_correction(text, words_detected):
    prompt="""
    You will receive a text with this format:
    text:
    words_detected:


    Accept both UK and US English. Evaluate only the neutrality of the provided text. Do not analyse grammar, spelling, or tone except where they introduce bias. Determine whether the text contains any subjective, emotional, judgemental, derogatory, or persuasive language. 
    If the text is not fully neutral, respond: "Yes". If the text is fully neutral, respond: "No". 
    If there are words in the words_detected. Respond Immediately with "Yes". Otherwise, analyse the text.
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