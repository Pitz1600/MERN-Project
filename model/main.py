from src.controller.grammar_checker import checker
from src.controller.sentiment_analysis import analyze
import json

def main():

    while True:
        get_input = input("Text(CTRL+C to exit): ")
        grammar_check = checker(get_input)
        convert_grammar_check = json.loads(grammar_check)
        
        sentiment_check = analyze(get_input)
        print(grammar_check)
        print(sentiment_check)
        


if __name__ == "__main__":
    main()