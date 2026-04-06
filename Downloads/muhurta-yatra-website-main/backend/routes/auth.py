from fastapi import APIRouter, HTTPException
from models.user import UserRegister, UserLogin
from database import db
from jose import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta
import bcrypt
import os

load_dotenv()
router = APIRouter()

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(data: dict):
    expire = datetime.utcnow() + timedelta(days=7)
    data.update({"exp": expire})
    return jwt.encode(data, os.getenv("JWT_SECRET"), algorithm="HS256")

@router.post("/register")
async def register(user: UserRegister):
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = hash_password(user.password)
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed,
        "role": "user"
    }
    result = await db.users.insert_one(new_user)
    token = create_token({"id": str(result.inserted_id), "role": "user"})
    return {"token": token, "user": {"name": user.name, "email": user.email, "role": "user"}}

@router.post("/login")
async def login(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"id": str(db_user["_id"]), "role": db_user["role"]})
    return {"token": token, "user": {"name": db_user["name"], "email": db_user["email"], "role": db_user["role"]}}