from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from datetime import datetime

class PlantBase(BaseModel):
    id: str
    name: str
    cat: str
    emoji: Optional[str] = "🌿"
    price: float = 0.0
    bulk: float = 0.0
    rating: float = 5.0
    reviews: int = 0
    image: Optional[str] = None
    desc: Optional[str] = ""
    care: Optional[Dict[str, Any]] = Field(default_factory=dict)
    stock: bool = True
    trending: bool = False
    badge: Optional[str] = ""
    seasonal: Optional[List[str]] = Field(default_factory=list)

class PlantCreate(PlantBase):
    pass

class PlantUpdate(BaseModel):
    name: Optional[str] = None
    cat: Optional[str] = None
    emoji: Optional[str] = None
    price: Optional[float] = None
    bulk: Optional[float] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    image: Optional[str] = None
    desc: Optional[str] = None
    care: Optional[Dict[str, Any]] = None
    stock: Optional[bool] = None
    trending: Optional[bool] = None
    badge: Optional[str] = None
    seasonal: Optional[List[str]] = None

class PlantResponse(PlantBase):
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
