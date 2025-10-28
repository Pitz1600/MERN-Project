import csv
import requests

def get_meaning(word):
    url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        return data[0]["meanings"][0]["definitions"][0]["definition"]
    except Exception:
        return "No definition found"

with open("bias_lexicon.csv", newline="", encoding="utf-8") as file, open("bias_lexicon_meaning.txt", "w", encoding="utf-8") as output:
    reader = csv.DictReader(file)
    output.write("word,score,meaning\n")
    for row in reader:
        word = row["word"]
        meaning = get_meaning(word)
        print(word, meaning)
        output.write(f"{word},{row['score']},{meaning}\n")