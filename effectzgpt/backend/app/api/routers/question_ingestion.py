from dotenv import load_dotenv

load_dotenv()

import logging
import ast

from fastapi import APIRouter, HTTPException, Form

from app.engine.query_preprocessor import add_questions

question_ingestion_router = r = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

@r.post("/ingest_questions")
async def ingest_questions(questions: str = Form(...), ids: str = Form(...)):
    try:
        add_questions(ast.literal_eval(questions), ast.literal_eval(ids))
    
        return {'message': 'Question ingestion completed'}

    except Exception as e:
        logger.error(f"An error occurred during question ingestion: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
