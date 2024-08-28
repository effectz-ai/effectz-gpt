import logging
import yaml
from fastapi import APIRouter, HTTPException
from typing import List
from app.engine.generate import generate_datasource
from app.engine.loaders.web import CrawlUrl, WebLoaderConfig

web_scraping_router = r = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

@r.post("/scrape_web")
async def scrape_web(requests: List[CrawlUrl]):
    try:
        web_loader_config = WebLoaderConfig()
        for request in requests:
            logger.info(f"Base URL: {request.base_url}")
            logger.info(f"Prefix: {request.prefix}")
            logger.info(f"Max depth: {request.max_depth}")

            crawl_url = CrawlUrl(base_url=request.base_url, prefix=request.prefix, max_depth=request.max_depth)
            web_loader_config.urls.append(crawl_url)
        
        with open("config/temp_loader.yaml", "w") as file:
            yaml.dump({"web": web_loader_config.dict()}, file)

        generate_datasource("temp_loader")

        with open("config/temp_loader.yaml", "w") as file:
            file.write("")

        return {'message': 'Ingestion completed'}
    except Exception as e:
        logger.error(f"An error occurred during web scraping: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")