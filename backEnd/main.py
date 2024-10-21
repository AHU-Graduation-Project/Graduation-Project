from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2, OAuth2PasswordRequestForm
from pydantic import BaseModel
from routes import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    # Allows all origins, but be more restrictive in production
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
# app.include_router(course.router, prefix="/api/v1/courses", tags=["Courses"])
# app.include_router(user.router, prefix="/api/v1/users", tags=["Users"])


@app.get("/")
async def root():
    return {"message": "Welcome to the Job Position Roadmap Recommender API"}
