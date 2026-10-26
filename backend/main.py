
from fastapi import FastAPI

app = FastAPI(title="CareerPath AI")

@app.get("/")
def home():
    return {
        "message": "Welcome to CareerPath AI",
        "status": "Backend is running"
    }
