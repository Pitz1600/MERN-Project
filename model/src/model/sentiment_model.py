from pydantic import BaseModel
from enum import Enum

class SentimentCategory(Enum):
    neutral = "Neutral"
    bias = "Bias"

class Sentiment(BaseModel):
    sentiment: SentimentCategory
    biased_words: list
    reason_for_bias: str
    suggest_neutral_text: str