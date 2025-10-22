import ollama
from pydantic import BaseModel
import json
from src.model.sentiment_model import Sentiment

def analyze(text):
    prompt = """
    You are a sentiment and bias analyst. You will analyse the sentiment and bias of a paragraph and You will Respond ONLY with a JSON object matching the provided schema.
    """
    response = ollama.chat(
        messages=[
            {
                "role":"system",
                "content":prompt,
                "role":"user",
                "content": f'Sentence: "{text}"',
            },
        ],
        model="deepseek-r1:8b",
        format=Sentiment.model_json_schema(),
        options={"temperature": 0},
    )

    if response and response.get("message") and response["message"].get("content"):
        content = response["message"]["content"]
        dict_convert_content = json.loads(content)
        merged_json = json.dumps(dict_convert_content, indent=4)
        return merged_json