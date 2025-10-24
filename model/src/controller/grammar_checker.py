import ollama
from pydantic import BaseModel
import json
from src.model.grammar_model import Grammar

def grammar_correction(text):
    
    prompt = """
    You are a grammar and spelling correction assistant.

    Your task:
    - Fix only grammar, spelling, and punctuation mistakes.
    - Do not change the meaning, tone, or structure of the text.
    - Keep the original flow and word choice as much as possible.
    - When explaining, use simple, clear English so anyone can understand.

    Output must strictly follow this format:
    Original_Text: "write here the original text"
    Words_detected: "write here the incorrect words"
    Suggested_text: "writes here the complete correction"
    Reason_for_correction: "writes here the reason of correction"

    Example:
    Input: I has go to the market yesturday and buyed some apple.
    Output:
    Original_Text: "I has go to the market yesturday and buyed some apple."
    Words_detected: "buyed", "has go", "yesturday", "apple"
    Suggested_text: "I went to the market yesterday and bought some apples."
    Reason_for_correction: "I fixed the verb forms ('has go' → 'went', 'buyed' → 'bought'), corrected the spelling of 'yesterday', and made 'apple' plural to match the sentence."
    """

    response = ollama.chat(
        messages=[
            {
                "role":"system",
                "content":prompt
            },
            {
                "role":"user",
                "content": f'text: "{text}"',
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )

    return response["message"]["content"]