from pydantic import BaseModel
from typing import Optional, List

class Tour(BaseModel):
    title: str
    description: str
    location: str
    price: float
    duration: str
    images: List[str] = []
    maxGroupSize: int
    available: Optional[bool] = True