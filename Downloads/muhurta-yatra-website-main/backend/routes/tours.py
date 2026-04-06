from fastapi import APIRouter, Depends
from models.tour import Tour
from database import db
from middleware.auth_middleware import verify_token, is_admin
from bson import ObjectId

router = APIRouter()

def serialize(tour) -> dict:
    tour["id"] = str(tour["_id"])
    del tour["_id"]
    return tour

@router.get("/")
async def get_all_tours():
    tours = await db.tours.find({"available": True}).to_list(100)
    return [serialize(t) for t in tours]

@router.get("/{tour_id}")
async def get_tour(tour_id: str):
    tour = await db.tours.find_one({"_id": ObjectId(tour_id)})
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
    return serialize(tour)