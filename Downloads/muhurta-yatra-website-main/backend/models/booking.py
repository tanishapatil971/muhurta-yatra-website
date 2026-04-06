from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Booking(BaseModel):
    tourId: str
    date: datetime
    seats: int
    totalPrice: float
    status: Optional[str] = "pending"