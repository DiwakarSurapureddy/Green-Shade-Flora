from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class GalleryResponse(BaseModel):
    id: int
    title: str
    category: str
    desc: Optional[str] = ""
    image_url: str
    file_name: Optional[str] = None
    file_size: Optional[int] = 0
    created_at: datetime

    class Config:
        from_attributes = True
