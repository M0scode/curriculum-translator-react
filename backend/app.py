from fastapi import FastAPI
from pydantic import BaseModel

from backend.services.translator import translate
from fastapi.middleware.cors import CORSMiddleware

from fastapi import UploadFile, File
from backend.document_processor import (
    extract_text_from_docx,
    create_docx
)

from fastapi.responses import FileResponse

import shutil
import os

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(
    title="Curriculum Translator API",
    description="English to isiZulu AI Translation Service",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranslationRequest(BaseModel):
    text: str


@app.get("/")
def home():
    return {
        "message": "Curriculum Translator API running"
    }


@app.post("/translate")
def translate_text(request: TranslationRequest):

    translated = translate(request.text)

    return {
        "original": request.text,
        "translation": translated
    }

@app.post("/translate-document")
async def translate_document(
    file: UploadFile = File(...)
):

    upload_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(upload_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )


    text = extract_text_from_docx(
        upload_path
    )


    translated = translate(text)


    output_path = (
        "uploads/translated_document.docx"
    )


    create_docx(
        translated,
        output_path
    )

    return FileResponse(
        path=output_path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename="translated_document.docx"
    )

@app.get("/download/{filename}")
async def download_file(filename: str):

    file_path = os.path.join(
        "uploads",
        filename
    )

    return FileResponse(
        file_path,
        filename=filename
    )