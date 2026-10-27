
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from models import User
from auth import get_current_user

from pypdf import PdfReader
from docx import Document
from io import BytesIO
from zipfile import BadZipFile
from cv_analyzer import analyze_cv


router = APIRouter(prefix="/cv", tags=["CV Upload"])

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


@router.post("/upload")
async def upload_cv(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    if not file.filename or not file.filename.lower().endswith(
        (".pdf", ".docx")
    ):
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed"
        )

    content = await file.read(MAX_FILE_SIZE + 1)

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="CV file must be 5 MB or smaller"
        )

    try:
        if file.filename.lower().endswith(".pdf"):
            if not content.startswith(b"%PDF-"):
                raise ValueError("Invalid PDF file")

            reader = PdfReader(BytesIO(content))
            extracted_text = "\n".join(
                page.extract_text() or "" for page in reader.pages
            )

        else:
            if not content.startswith(b"PK"):
                raise ValueError("Invalid DOCX file")

            document = Document(BytesIO(content))
            extracted_text = "\n".join(
                paragraph.text for paragraph in document.paragraphs
            )

    
    except Exception as error:
        raise HTTPException(
            status_code=400,
            detail="Unable to read this document. Please upload a valid PDF or DOCX."
        ) from error

    analysis = analyze_cv(extracted_text)

    return {
        "message": "CV uploaded and analyzed successfully",
        "filename": file.filename,
        "size_bytes": len(content),
        "user_id": current_user.id,
        "extracted_text": extracted_text,
        "analysis": analysis
    }
