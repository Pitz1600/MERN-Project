import ollama

def need_tone_correction(text):
    
    response = ollama.chat(
        messages=[
            {
                "role":"user",
                "content": f'Accept UK and US based English. Does this text have double meanings or other figures of speech? Respond only with a yes or no. text: "{text}"',
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )

    return response["message"]["content"].lower()