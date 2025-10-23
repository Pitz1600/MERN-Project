from pydantic import BaseModel

class Tone(BaseModel):
    text: str
    reason_of_correction: str