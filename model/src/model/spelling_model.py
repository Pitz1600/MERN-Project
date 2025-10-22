from pydantic import BaseModel

class Spelling(BaseModel):
    wrong_word: str
    corrected_word: str
    reason_of_correction: str