from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from auth import router as auth_router, get_current_user
from cv import router as cv_router

from database import get_db
from models import Student, User

from career_recommender import recommend_careers
from models import CVAnalysis

from learning_roadmap import generate_roadmap
from career_recommender import recommend_careers
from models import Student, CVAnalysis, User



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


@app.get("/careers/recommendations")
def get_career_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Find the logged-in user's most recent CV analysis
    latest_cv = (
        db.query(CVAnalysis)
        .filter(CVAnalysis.user_id == current_user.id)
        .order_by(
            CVAnalysis.created_at.desc(),
            CVAnalysis.id.desc()
        )
        .first()
    )

    if latest_cv is None:
        raise HTTPException(
            status_code=404,
            detail="No CV analysis found. Please upload a CV first."
        )

    recommendations = recommend_careers(latest_cv.skills or [])

    return {
        "analysis_id": latest_cv.id,
        "skills_used": latest_cv.skills,
        "total_careers": len(recommendations),
        "recommendations": recommendations[:5]
    }



@app.get("/careers/roadmap")
def get_learning_roadmap(
    career: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get the logged-in user's student profile
    student = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found. Please create a profile first."
        )

    if student.weekly_study_hours <= 0:
        raise HTTPException(
            status_code=400,
            detail="Weekly study hours must be greater than zero."
        )

    # Get the user's latest CV analysis
    latest_cv = (
        db.query(CVAnalysis)
        .filter(CVAnalysis.user_id == current_user.id)
        .order_by(
            CVAnalysis.created_at.desc(),
            CVAnalysis.id.desc()
        )
        .first()
    )

    if latest_cv is None:
        raise HTTPException(
            status_code=404,
            detail="No CV analysis found. Please upload a CV first."
        )

    # Find the requested career
    recommendations = recommend_careers(latest_cv.skills or [])

    selected_career = next(
        (
            item for item in recommendations
            if item["career"].casefold() == career.strip().casefold()
        ),
        None
    )

    if selected_career is None:
        raise HTTPException(
            status_code=404,
            detail="Career not found."
        )

    # Build the roadmap using missing skills
    roadmap = generate_roadmap(
        selected_career["missing_skills"],
        student.weekly_study_hours
    )

    return {
        "career": selected_career["career"],
        "analysis_id": latest_cv.id,
        "match_percentage": selected_career["match_percentage"],
        "matching_skills": selected_career["matching_skills"],
        "missing_skills": selected_career["missing_skills"],
        "learning_plan": roadmap
    }

