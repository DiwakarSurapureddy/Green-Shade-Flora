from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OrderCreate(BaseModel):
    order_code: Optional[str] = None
    name: str
    phone: str
    email: Optional[str] = ""
    city: Optional[str] = ""
    address: Optional[str] = ""
    plants: str
    contract: Optional[str] = ""
    qty: Optional[int] = 1
    notes: Optional[str] = ""
    source: Optional[str] = "Direct Website"
    order_type: Optional[str] = "retail"

class OrderStatusUpdate(BaseModel):
    status: str

class OrderResponse(BaseModel):
    id: int
    order_code: str
    name: str
    phone: str
    email: Optional[str] = None
    city: Optional[str] = None
    address: Optional[str] = None
    plants: str
    contract: Optional[str] = None
    qty: int
    notes: Optional[str] = None
    source: Optional[str] = None
    order_type: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
