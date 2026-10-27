from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from auth import router as auth_router, get_current_user
from cv import router as cv_router

from database import get_db
from models import Student, User


app = FastAPI(title="CareerPath AI")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"]
)

app.include_router(auth_router)
app.include_router(cv_router)

# Student information received from the frontend
class StudentProfile(BaseModel):
    name: str
    major: str
    skills: list[str]
    target_role: str
    weekly_study_hours: int = Field(ge=1, le=168)


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "Welcome to CareerPath AI",
        "status": "Backend is running"
    }


# Create a student and save to PostgreSQL

# Create a student profile for the logged-in user
@app.post("/students", status_code=201)
def create_student(
    student: StudentProfile,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing_profile = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if existing_profile:
        raise HTTPException(
            status_code=409,
            detail="You already have a student profile"
        )

    new_student = Student(
        **student.model_dump(),
        user_id=current_user.id
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {
        "message": "Student profile created successfully",
        "student_id": new_student.id,
        "student": student.model_dump()
    }


# Retrieve a student profile belonging to the logged-in user
@app.get("/students/{student_id}")
def get_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    student = db.query(Student).filter(
        Student.id == student_id,
        Student.user_id == current_user.id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    return {
        "name": student.name,
        "major": student.major,
        "skills": student.skills,
        "target_role": student.target_role,
        "weekly_study_hours": student.weekly_study_hours
    }
