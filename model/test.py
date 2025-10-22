import ollama

model = 'deepseek-r1:8b'

model_instructions = """
You are a text assistant.
You are tasked to check the spelling and the grammar of the text, if the text have grammatical and spelling errors you will fix the text. 
You will tell me what is the sentiment of the text if its (Neutral, Positive, Negative, Unclear) and what are the biased words on the text. You will tell me the confidence level
of your assessment of the sentiment of the text.
If the sentiment of the text is either Positive or Negative you will generate a neutral text based on the text you receive. If you can't tell if the text is either of the three you will give the text unclear sentiment

This will be the flow of your work:
You will check what's the sentiment of the text and give confidence level of your assessment. After checking the sentiment of the text you will then give neutral text suggestions. If the sentiment
is already neutral you will check if the grammar and spelling is correct. Correct them based on the text.

This is the format of our conversation.
I will send you the text like this:
text: sample text

You will only response in this format:
sentiment: (Negative, Positive, Neutral, Unclear)
biased words: biased words on the text
confidence level: 0% - 100%
suggested text: sample text
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