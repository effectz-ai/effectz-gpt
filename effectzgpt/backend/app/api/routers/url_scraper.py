import logging
import os
import requests
from bs4 import BeautifulSoup
from fastapi import APIRouter, HTTPException, Form

url_scraping_router = r = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

@r.post("/scrape_url")
async def scrape_url(url: str = Form(...)):
    try:
        response = requests.get(url.strip())

        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            
            texts = soup.get_text(separator=' ', strip=True)
            
            table_headings = []

            for table in soup.find_all('table'):
                headings = [th.get_text(strip=True) for th in table.find_all('th')]
                table_headings.extend(headings)

            return {
                'text_content': texts,
                'table_headings': table_headings
            }
        
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch the URL")

    except Exception as e:
        logger.error(f"An error occurred during ingestion: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")