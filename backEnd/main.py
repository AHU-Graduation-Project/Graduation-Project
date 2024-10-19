from fastapi import FastAPI
from pydantic import BaseModel

#from routes import auth, course, user

app = FastAPI()

#app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
# Uncomment if you have course and user implemented
# app.include_router(course.router, prefix="/api/v1/courses", tags=["Courses"])
# app.include_router(user.router, prefix="/api/v1/users", tags=["Users"])


@app.get("/")
async def root():
    return {"message": "Welcome to the Job Position Roadmap Recommender API"}
