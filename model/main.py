from src.controller.grammar_checker import grammar_correction
from src.controller.tone_checker import tone_correction
from src.controller.sentiment_checker import sentiment_correction
from src.controller.neutral_checker import neutral_correction
from src.controller.need_grammar_correction import need_grammar_correction
from src.controller.need_tone_correction import need_tone_correction
from src.controller.need_sentiment_correction import need_sentiment_correction
from src.controller.json_extract import extract
from src.controller.words_lexicon_detected import words_detected
from ollama import _types
import json

def main():

    while True:
        get_input = input("Text(CTRL+C to exit): ")
        main_function(get_input)

def main_function(text):
    word_in_lexicon = words_detected(text)
    words_only = [n[0] for n in word_in_lexicon]
    words_score = [(int(n[1]) / 5) for n in word_in_lexicon]
    try:
        check_grammar_correction = need_grammar_correction(text)
        if check_grammar_correction.lower() == "yes":
            grammar_correct = grammar_correction(text)
            return extract(grammar_correct, "grammar", "Reviewable")
        else:
            check_sentiment_correction = need_sentiment_correction(text, words_only)
            if check_sentiment_correction.lower() == "yes":
                sentiment_correct = sentiment_correction(text)
                data = extract(sentiment_correct, "sentiment", "Biased")
                data["sentiment_score"] = round(float(data["sentiment_score"]) + sum(words_score), 2)
                model_word_list = [word.strip().strip('"') for word in data["words_detected"].split(',')]
                combined_word_list = model_word_list + words_only
                data["words_detected"] = ', '.join(f'"{item}"' for item in set(combined_word_list))
                return data
            else:
                neutral_correct = neutral_correction(text)
                return extract(neutral_correct, "sentiment", "Neutral")
    except ConnectionError:
        print("Failed to connect to Ollama. Please check that Ollama is downloaded, running and accessible.")
    except _types.ResponseError:
        print("Failed to connect to Ollama Server. Please check your internet connection.")

def convert_score(score):
    return score / 5

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