
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="CareerPath AI")


class StudentProfile(BaseModel):
    name: str
    major: str
    skills: list[str]
    target_role: str
    weekly_study_hours: int = Field(ge=1, le=168)


students = {}


@app.get("/")
def home():
    return {
        "message": "Welcome to CareerPath AI",
        "status": "Backend is running"
    }


@app.post("/students", status_code=201)
def create_student(student: StudentProfile):
    student_id = len(students) + 1
    students[student_id] = student.model_dump()

    return {
        "message": "Student profile created successfully",
        "student_id": student_id,
        "student": students[student_id]
    }


@app.get("/students/{student_id}")
def get_student(student_id: int):
    if student_id not in students:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return students[student_id]
