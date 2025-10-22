from pydantic import BaseModel

class BiasWord(BaseModel):
    bias_word: str
    reason_of_bias: str