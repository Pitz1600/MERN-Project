import ollama

model = 'deepseek-r1:8b'

model_instructions = """
You are a text assistant.
Input: "TEXT"
For every sentence:
1. Detect spelling mistakes.
2. Detect grammar mistakes.
3. If no mistakes are found, display the sentence as is.
4. If mistakes are found, generate the corrected version and explain the changes.

You will only response in this format:
Sentence 1: "NO MISTAKE SENTENCE"
Explanation: No mistakes found.
Sentence 2: "CORRECTED SENTENCE"
Explanation: [Explain the grammar and spelling mistakes in detail.]
Sentence 3: "CORRECTED SENTENCE"
Explanation: [Explanation for sentence 3, if applicable.]
... and so on.
"""
 
while True:
    text_input = input("Prompt: ")
    if text_input.lower() in ["exit", "quit"]:
        print("Quiting...")
        break

    messages = [{'role':'system', 'content': model_instructions}]
    messages.append({'role':'user', 'content':f"text: {text_input}"})
    print("", end='', flush=True)
    response_text = ""

    for chunk in ollama.chat(model=model, messages=messages, stream=True):
        content = chunk['message']['content']
        print(content, end='', flush=True)
        response_text += content

    print("\n")