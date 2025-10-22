import ollama
from pydantic import BaseModel
import json
from src.model.grammar_model import Grammar

def checker(text):
    
    response = ollama.chat(
        messages=[
            {
                "role":"user",
                "content": f'Correct all the grammar and spelling errors in the following sentence. If no mistakes are found, display the sentence as is. You will accept UK and US based english. Respond ONLY with a JSON object matching the provided schema. Sentence: "{text}"',
            },
        ],
        model="deepseek-r1:8b",
        format=Grammar.model_json_schema(),
        options={"temperature": 0},
    )

    if response and response.get("message") and response["message"].get("content"):
        content = response["message"]["content"]
        original_text = {
            'original_sentence': text,
        }

        dict_convert_content = json.loads(content)
        merged_content = dict_convert_content | original_text

        merged_json = json.dumps(merged_content, indent=4)

        return merged_json