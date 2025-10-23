from pydantic import BaseModel

class Spelling(BaseModel):
    spelling_correction: str
    orignal_word: str