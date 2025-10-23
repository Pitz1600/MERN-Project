import ollama
from pydantic import BaseModel
import json
from src.model.sentiment_model import Sentiment

def analyze(text):
    prompt = """
    You are a bias analysis model. Your task is to analyze the given paragraph and determine if it is biased or neutral.

    Definitions:
    - "Bias" means the paragraph includes **emotionally loaded**, **subjective**, **judgmental**, or **opinionated** language that expresses approval or disapproval.
    - "Neutral" means the paragraph is **objective**, **factual**, and **free of emotional or judgmental wording**.

    Follow these exact steps:
    1. Determine whether the paragraph is biased (contains subjective, emotional, judgmental, or opinion-based language) or neutral (objective and factual).
    2. Identify all biased or opinionated words or phrases and explain why each is biased.
    3. If the paragraph is biased, provide a neutral rephrasing.
    4. Respond ONLY with a JSON object that matches the following schema. Do NOT include any extra text, comments, or explanations outside the JSON.

    Schema:
    {
    "sentiment": "Bias" | "Neutral",
    "biased_words": [
        {
        "bias_word": "string",
        "reason_of_bias": "string"
        }
    ],
    "reason_for_bias": "string",
    "suggest_neutral_text": "string"
    }

    Important:
    - NEVER default to "Neutral" unless you are absolutely certain there is **no subjective, emotional, or judgmental wording**.
    - Always check for subtle bias (e.g., adjectives like “reckless,” “brilliant,” “corrupt,” or “incompetent”).

    Guidelines:
    - "Bias" means the text includes subjective, emotionally loaded, judgmental, or stereotypical language. This includes generalizations or assumptions about groups (e.g., gender, race, nationality, age, or occupation).
    - "Neutral" means the text presents information factually and objectively, without implying judgment, emotion, or stereotypes.
    - If the text is neutral:
    - "biased_words" should be an empty list []
    - "reason_for_bias" should explain that no bias was detected
    - "suggest_neutral_text" should be the same as the original text.
    - When providing "suggest_neutral_text":
    - Preserve all information, events, and entities from the original text.
    - Do not remove, skip, or omit any sentences or details.
    - Rephrase the text to be neutral while keeping a natural and coherent flow.
    - Ensure transitions between sentences sound connected and logically consistent.
    - Avoid robotic or fragmented tone.
    - Example:
        - Original: "Women are too emotional to handle leadership roles. Many women today are pursuing careers in science and technology. Oh, she got promoted so fast, must be her charm."
        - Correct Neutral Version: "Some people believe that women may be too emotional for leadership roles, yet many women today are successfully pursuing careers in science and technology. Her quick promotion could be attributed to her professional abilities and achievements."
        - Incorrect: "Some people believe that women are too emotional to handle leadership roles. However, many women today are pursuing careers in science and technology. Her promotion occurred quickly, possibly due to her professional qualifications and performance."
        (This version is grammatically correct but lacks smooth transitions and natural flow.)
    - If a sentence expresses or implies a stereotype, prejudice, or biased belief, it must be classified as "Bias" even if written in a calm or factual tone.
    - If the text is already neutral, do not modify it in any way. Do not rewrite, paraphrase, or add suggestions. Simply return the original text as "suggest_neutral_text" without changes.

    Example Input:
    "The company’s greedy executives ruined the workers’ lives."

    Example Output:
    {
    "sentiment": "Bias",
    "biased_words": [
        {
        "bias_word": "greedy",
        "reason_of_bias": "Expresses a moral judgment about the executives rather than stating a fact."
        },
        {
        "bias_word": "ruined",
        "reason_of_bias": "Emotionally charged term implying total destruction instead of measurable harm."
        }
    ],
    "reason_for_bias": "The sentence uses emotionally charged and judgmental words to describe the executives’ actions.",
    "suggest_neutral_text": "The company’s executives made decisions that negatively affected the workers’ lives."
    }

    Now analyze the following paragraph and produce the JSON response only:
    """
    response = ollama.chat(
        messages=[
            {
                "role":"system",
                "content":prompt,
            },
            {
                "role":"user",
                "content": f'Sentence: "{text}"',
            },
        ],
        model="gpt-oss:120b-cloud",
        format=Sentiment.model_json_schema(),
        options={"temperature": 0},
    )

    if response and response.get("message") and response["message"].get("content"):
        content = response["message"]["content"]
        dict_convert_content = json.loads(content)
        merged_json = json.dumps(dict_convert_content, indent=4)
        return merged_json