import logging
import yaml
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from typing import List
from app.engine.generate import generate_datasource

web_scraping_router = r = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

class ScrapeRequest(BaseModel):
    urls: List[str]
    depth: int = 0

@r.post("/scrape_web")
async def scrape_web(request: ScrapeRequest):
    try:
        logger.info(f"Received URLs: {request.urls}")
        logger.info(f"Depth: {request.depth}")

        web_loader_config = {
            "web": {
                "urls": [{"base_url": url, "prefix": url, "max_depth": request.depth} for url in request.urls],
            }
        }

        with open("config/loaders.yaml", "r") as file:
            config = yaml.safe_load(file)

        config.update(web_loader_config)

        with open("config/loaders.yaml", "w") as file:
            yaml.safe_dump(config, file)

        generate_datasource()

        with open("config/loaders.yaml", "r") as file:
            config = yaml.safe_load(file)

        if "web" in config:
            del config["web"]

        with open("config/loaders.yaml", "w") as file:
            yaml.safe_dump(config, file)

        return {'message': 'Ingestion completed'}
    except Exception as e:
        logger.error(f"An error occurred during web scraping: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")