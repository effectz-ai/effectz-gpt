from dotenv import load_dotenv

load_dotenv()

import logging
from fastapi import APIRouter, HTTPException, Form

from app.engine.image_generator import generate_image

image_generation_router = r = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

@r.post("/generate_images")
async def generate_images(prompt: str = Form(...)):
    logger.info(f"Prompt: {prompt}")
    try:
        url_array = generate_image(prompt)
        return {'response': url_array}

    except Exception as e:
        logger.error(f"An error occurred image generation: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")