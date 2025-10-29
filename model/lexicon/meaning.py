import ollama

def meaning(text):

    prompt="""
    You are given a word, provide only its basic meaning in 1–2 sentences. Output in plain text.
    """
    
    response = ollama.chat(
        messages=[
            {
                "role":"system",
                "content":prompt,
            },
            {
                "role":"user",
                "content": f'Word: {text}',
            },
        ],
        model="gpt-oss:120b-cloud",
        options={"temperature": 0},
    )

    return response["message"]["content"]