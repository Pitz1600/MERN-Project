import re
import json

def extract(output, type, category):
    matches = re.findall(r'(\w+):\s*([^:]+)(?=\s+\w+:|$)', output)
    data = {k: v.strip().strip('"\\') for k, v in matches}
    complete_data = {"type": type, "category": category} | data
    print(json.dumps(complete_data, indent=2, ensure_ascii=False))  # For debugging
    return complete_data  # Return the dictionary directly