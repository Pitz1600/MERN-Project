import re
import json

def extract(output, type, category):
    matches = re.findall(r'(\w+):\s*([^:]+)(?=\s+\w+:|$)', output)
    data = {k: v.strip().strip('"\\') for k, v in matches}
    complete_data = {"type": type, "category": category} | data
    json_output = json.dumps(complete_data, indent=2, ensure_ascii=False)
    print(json_output)