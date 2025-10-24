from src.controller.grammar_checker import grammar_correction
from src.controller.tone_checker import tone_correction
from src.controller.sentiment_checker import sentiment_correction
from src.controller.need_grammar_correction import need_grammar_correction
from src.controller.need_tone_correction import need_tone_correction
from src.controller.need_sentiment_correction import need_sentiment_correction
from src.controller.json_extract import extract
import json

def main():

    while True:
        get_input = input("Text(CTRL+C to exit): ")
        main_function(get_input)

def main_function(text):
    check_grammar_correction = need_grammar_correction(text)
    if check_grammar_correction.lower() == "yes":
        grammar_correct = grammar_correction(text)
        return extract(grammar_correct, "grammar", "Reviewable")
    else:
        check_sentiment_correction = need_sentiment_correction(text)
        if check_sentiment_correction.lower() == "yes":
            sentiment_correct = sentiment_correction(text)
            return extract(sentiment_correct, "sentiment", "Biased")
        else:
            data = {
                "type": "sentiment",
                "category": "Neutral",
                "Original_text": text,
                "Words_detected": None,
                "Reason_for_correction": "No correction needed."
            }
            complete_data = {"type": type} | data
            json_output = json.dumps(complete_data, indent=2, ensure_ascii=False)
            print(json_output)
            return json_output

def tester(text):
    test_correction = need_grammar_correction(text)
    print(test_correction)
    test_tone = need_tone_correction(text)
    print(test_tone)
    test_sentiment_corrector = need_sentiment_correction(text)
    print(test_sentiment_corrector)
    test_tone_corrector = tone_correction(text)
    print(test_tone_corrector)   
    test_grammar_corrector = grammar_correction(text)
    print(test_grammar_corrector)
    test_sentiment_corrector = sentiment_correction(text)
    print(test_sentiment_corrector)

if __name__ == "__main__":
    main()