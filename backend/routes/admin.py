from fastapi import APIRouter, Depends, HTTPException
from models.tour import Tour
from database import db
from middleware.auth_middleware import is_admin
from bson import ObjectId

router = APIRouter()

def serialize(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

# Tours CRUD
@router.post("/tours")
async def add_tour(tour: Tour, admin=Depends(is_admin)):
    result = await db.tours.insert_one(tour.dict())
    return {"message": "Tour added", "id": str(result.inserted_id)}

@router.put("/tours/{tour_id}")
async def update_tour(tour_id: str, tour: Tour, admin=Depends(is_admin)):
    await db.tours.update_one({"_id": ObjectId(tour_id)}, {"$set": tour.dict()})
    return {"message": "Tour updated"}

@router.delete("/tours/{tour_id}")
async def delete_tour(tour_id: str, admin=Depends(is_admin)):
    await db.tours.delete_one({"_id": ObjectId(tour_id)})
    return {"message": "Tour deleted"}

# All bookings (admin only)
@router.get("/bookings")
async def all_bookings(admin=Depends(is_admin)):
    bookings = await db.bookings.find().to_list(100)
    return [serialize(b) for b in bookings]