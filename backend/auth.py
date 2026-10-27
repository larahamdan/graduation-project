
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import select, func
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from pwdlib import PasswordHash

from database import get_db
from models import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

password_hash = PasswordHash.recommended()


class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


@router.post("/register", status_code=201)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    email = str(data.email).lower()

    existing_user = db.scalar(
        select(User).where(func.lower(User.email) == email)
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )

    new_user = User(
        full_name=data.full_name,
        email=email,
        hashed_password=password_hash.hash(data.password)
    )

    db.add(new_user)

    try:
        db.commit()
        db.refresh(new_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )

    return {
        "message": "Account created successfully",
        "user_id": new_user.id,
        "full_name": new_user.full_name,
        "email": new_user.email
    }



import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY is missing from .env")


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    email = str(data.email).lower()

    user = db.scalar(
        select(User).where(func.lower(User.email) == email)
    )

    if user is None or not password_hash.verify(
        data.password, user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    expire = datetime.now(timezone.utc) + timedelta(minutes=30)

    token = jwt.encode(
        {
            "sub": str(user.id),
            "exp": expire
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

