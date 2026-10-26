
from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    major = Column(String(100), nullable=False)
    skills = Column(JSON, nullable=False)
    target_role = Column(String(100), nullable=False)
    weekly_study_hours = Column(Integer, nullable=False)
