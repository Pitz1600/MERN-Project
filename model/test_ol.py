import requests
import json

url = "https://api.tabularis.ai/"
headers = {
    "Content-Type": "application/json"
}
data = {
    "text": ["I love this design", "I hate this design"],
    "return_all_scores": True
}

response = requests.post(url, headers=headers, json=data)

print("Status Code:", response.status_code)

print(response.text)