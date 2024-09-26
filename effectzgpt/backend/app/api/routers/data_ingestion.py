from dotenv import load_dotenv

load_dotenv()

import logging
import os
from typing import List

from fastapi import APIRouter, HTTPException, UploadFile, File

from app.engine.generate import generate_datasource
from app.engine.raptor import raptor_ingestion

data_ingestion_router = r = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

STORAGE_DIR = os.getenv("STORAGE_DIR", "storage")
UPLOAD_FOLDER = 'data/data_source'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@r.post("/ingest_documents")
def ingest_documents(files: List[UploadFile] = File(...)):
    try:
        for file in files:
            file_path = os.path.join(UPLOAD_FOLDER, file.filename)
            with open(file_path, 'wb') as buffer:
                buffer.write(file.file.read())

        if os.getenv("USE_RAPTOR", "True").lower() == "true":
            raptor_ingestion(UPLOAD_FOLDER)
        else:
            generate_datasource("loaders")
    
        return {'message': 'Ingestion completed'}

    except Exception as e:
        logger.error(f"An error occurred during ingestion: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")