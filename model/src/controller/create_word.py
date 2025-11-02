import ollama
import re

def create_word(word):
    prompt = """
   You will receive a word in this format:
    word: [insert word]

    Respond using the exact format below:
    word:
    score: -1, 0, or 1 based on bias
    meaning: 1 sentence if possible

    Scoring rules:

    -1 (negative): The word shows a negative or unfavorable bias.

    0 (neutral): The word has no clear bias or is objective.

    1 (positive): The word shows a positive or favorable bias.
    """
    response = ollama.chat(
        messages=[
            {
                "role":"system",
                "content":prompt,
            },
            {
                "role":"user",
                "content": f'word: "{word}"',
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )

    matches = re.findall(r'(\w+):\s*([^:]+)(?=\s+\w+:|$)', response["message"]["content"])
    data = {k: v.strip().strip('"\\') for k, v in matches}

    return data