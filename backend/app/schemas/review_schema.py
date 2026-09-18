from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReviewCreate(BaseModel):
    name: str
    loc: str
    stars: Optional[int] = 5
    text: str
    plant: Optional[str] = "Green Shade Plant"
    avatar: Optional[str] = "👤"

class ReviewResponse(BaseModel):
    id: int
    name: str
    loc: str
    stars: int
    text: str
    plant: str
    avatar: str
    created_at: datetime

    class Config:
        from_attributes = True
