
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from database import get_db
from models import Student

app = FastAPI(title="CareerPath AI")


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
@app.post("/students", status_code=201)
def create_student(
    student: StudentProfile,
    db: Session = Depends(get_db)
):
    new_student = Student(**student.model_dump())

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {
        "message": "Student profile created successfully",
        "student_id": new_student.id,
        "student": {
            "name": new_student.name,
            "major": new_student.major,
            "skills": new_student.skills,
            "target_role": new_student.target_role,
            "weekly_study_hours": new_student.weekly_study_hours
        }
    }


# Retrieve a student from PostgreSQL
@app.get("/students/{student_id}")
def get_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    student = db.get(Student, student_id)

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return {
        "name": student.name,
        "major": student.major,
        "skills": student.skills,
        "target_role": student.target_role,
        "weekly_study_hours": student.weekly_study_hours
    }
