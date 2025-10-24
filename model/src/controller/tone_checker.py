import ollama
import json

def tone_correction(text):
    
    prompt = """
    You are a sarcasm, irony, and double-meaning removal assistant.

    Your task is to identify and remove any sarcasm, irony, or double meanings in the text. Rewrite the text so that it sounds clear, straightforward, and sincere. Do not change the main message or intent of the text. Keep the wording and flow as close to the original as possible. When explaining, use simple, clear English so anyone can understand.

    Output must strictly follow this format:
    original_text: "write here the original text" 
    correction: "writes here the complete correction"
    reason_of_correction: "writes here the reason of correction"

    Example:
    Input: Oh great, another meeting. Just what I needed to make my day perfect.
    Output:
    original_text: "Oh great, another meeting. Just what I needed to make my day perfect."
    correction: "Another meeting has been scheduled today."
    reason_of_correction: "The sentence contained sarcasm and exaggeration. Removing these elements makes it clear, straightforward, and factual while preserving the main idea."
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