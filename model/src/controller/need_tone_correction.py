import ollama

def need_tone_correction(text):
    
    response = ollama.chat(
        messages=[
            {
                "role":"user",
                "content": f'Accept UK and US based english. Does this text needs correction for double meaning, sarcasm, irony? Respond only with a yes or no. text: "{text}"',
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )

    return response["message"]["content"].lower()