from src.controller.grammar_checker import checker
from model.src.controller.sentiment_checker import analyze
import json

def sentiment_analyzer(text):
    sentence_list = text.split(".")
    for sentence in sentence_list:
        grammar_check = checker(sentence)
        convert_grammar_check = json.loads(grammar_check)
        sentiment_check = analyze(convert_grammar_check["corrected_text"])
        print(grammar_check)
        print(sentiment_check)