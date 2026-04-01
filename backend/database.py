from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
print("MONGO_URI loaded:", MONGO_URI)  # check terminal for this

if not MONGO_URI:
    raise Exception("MONGO_URI not found in .env!")

client = AsyncIOMotorClient(MONGO_URI)
db = client.muhurtayatra