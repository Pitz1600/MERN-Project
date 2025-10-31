import csv
import re

# Load csv file before searching
def load_word_dict(csv_path):
    word_dict = {}
    with open(csv_path, newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) >= 2:
                word = row[0].strip().lower()
                value = row[1].strip()
                word_dict[word] = value
    return word_dict

# Searching for words that in the sentence that appear in bias lexicon
def find_words_in_sentence(sentence, word_dict):
    tokens = re.findall(r'\b\w+\b', sentence.lower())
    matches = [(word, word_dict[word]) for word in tokens if word in word_dict]
    return matches

# Test function.. Don't mind
def main():
    dictionary = load_word_dict("./lexicon/bias_lexicon.csv")
    sentence = "Hello, I fucking hate you."
    result = find_words_in_sentence(sentence, dictionary)
    print(result)

main()