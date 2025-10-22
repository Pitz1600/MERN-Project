from pydantic import BaseModel
# from typing import List
# from src.model.spelling_model import Spelling

class Grammar(BaseModel):
    # spelling_corrections: List[Spelling]
    corrected_text: str
    reason_of_correction: str