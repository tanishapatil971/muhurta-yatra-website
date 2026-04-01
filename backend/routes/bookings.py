from fastapi import APIRouter, Depends, HTTPException
from models.booking import Booking
from database import db
from middleware.auth_middleware import verify_token
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.post("/")
async def create_booking(booking: Booking, user=Depends(verify_token)):
    new_booking = {
        **booking.dict(),
        "userId": user["id"],
        "createdAt": datetime.utcnow()
    }
    result = await db.bookings.insert_one(new_booking)
    return {"message": "Booking confirmed", "bookingId": str(result.inserted_id)}

@router.get("/my")
async def my_bookings(user=Depends(verify_token)):
    bookings = await db.bookings.find({"userId": user["id"]}).to_list(100)
    for b in bookings:
        b["id"] = str(b["_id"])
        del b["_id"]
    return bookings