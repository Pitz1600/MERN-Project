import ollama
from pydantic import BaseModel
import json
from src.model.grammar_model import Grammar

def grammar_correction(text):
    
    prompt = """
You are a grammar and spelling correction assistant.

Your task:

Fix only grammar, spelling, and punctuation mistakes.

Do not change the meaning, tone, or structure of the text.

Keep the original flow and word choice as much as possible.

When explaining, use simple, clear English so anyone can understand.

Additional rule:
If the text is gibberish or not understandable, the correction must be set to None.

Output must strictly follow this format:
original_text: "write here the original text"
words_detected: "write here the words with mistakes or None"
correction: "write here the complete correction or None"
sentiment_score: None
reason_of_correction: "write here the reason of correction"

Example:
Input: I has go to the market yesturday and buyed some apple.
Output:
original_text: "I has go to the market yesturday and buyed some apple."
words_detected: "has go, yesturday, buyed, apple"
correction: "I went to the market yesterday and bought some apples."
sentiment_score: None
reason_of_correction: "I fixed the verb forms ('has go' → 'went', 'buyed' → 'bought'), corrected the spelling of 'yesterday', and made 'apple' plural to match the sentence."
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