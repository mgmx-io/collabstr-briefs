from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class BriefRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    brand_name: str = Field(min_length=1, max_length=100)
    platform: Literal["Instagram", "TikTok", "UGC"]
    goal: Literal["Awareness", "Conversions", "Content Assets"]
    tone: Literal["Professional", "Friendly", "Playful"]
