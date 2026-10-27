from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey

from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
    Integer,
    ForeignKey("users.id"),
    nullable=True,
    unique=True
)
    name = Column(String(100), nullable=False)
    major = Column(String(100), nullable=False)
    skills = Column(JSON, nullable=False)
    target_role = Column(String(100), nullable=False)
    weekly_study_hours = Column(Integer, nullable=False)

    
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )


class CVAnalysis(Base):
    __tablename__ = "cv_analyses"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    filename = Column(String(255), nullable=False)

    skills = Column(JSON, nullable=False)
    education = Column(JSON, nullable=False)
    experience = Column(JSON, nullable=False)

    extracted_text = Column(String, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

