from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, tours, bookings, admin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth")
app.include_router(tours.router, prefix="/api/tours")
app.include_router(bookings.router, prefix="/api/bookings")
app.include_router(admin.router, prefix="/api/admin")