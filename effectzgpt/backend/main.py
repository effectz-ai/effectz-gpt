from sys import prefix

from dotenv import load_dotenv

from app.api.routers.agent import agent_router

load_dotenv()
load_dotenv(".env.local", override=True)

import logging
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from app.api.routers.chat import chat_router
from app.api.routers.management.files import files_router
from app.api.routers.management.llamacloud import llamacloud_router
from app.api.routers.management.loader import loader_router
from app.api.routers.management.reranker import reranker_router
from app.api.routers.management.tools import tools_router
from app.api.routers.model_config import config_router
from app.api.routers.upload import file_upload_router
from app.api.routers.data_ingestion import data_ingestion_router
from app.api.routers.image_generation import image_generation_router
from app.api.routers.url_scraper import url_scraping_router
from app.api.routers.web_scraper import web_scraping_router
from app.api.routers.question_ingestion import question_ingestion_router
from app.settings import init_settings
from app.observability import init_observability
from fastapi.staticfiles import StaticFiles


app = FastAPI()

init_settings()
init_observability()

environment = os.getenv("ENVIRONMENT", "dev")  # Default to 'development' if not set
logger = logging.getLogger("uvicorn")

if environment == "dev":
    logger.warning("Running in development mode - allowing CORS for all origins")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Redirect to documentation page when accessing base URL
    @app.get("/")
    async def redirect_to_docs():
        return RedirectResponse(url="/docs")


def mount_static_files(directory, path):
    if os.path.exists(directory):
        for dir, _, _ in os.walk(directory):
            relative_path = os.path.relpath(dir, directory)
            mount_path = path if relative_path == "." else f"{path}/{relative_path}"
            logger.info(f"Mounting static files '{dir}' at {mount_path}")
            app.mount(mount_path, StaticFiles(directory=dir), name=f"{dir}-static")


# Mount the data files to serve the file viewer
mount_static_files("data", "/api/files/data")
# Mount the output files from tools
mount_static_files("output", "/api/files/output")

app.include_router(chat_router, prefix="/api/chat")
app.include_router(agent_router, prefix="/api/agent")
app.include_router(file_upload_router, prefix="/api/chat/upload")
app.include_router(data_ingestion_router, prefix="/api")
app.include_router(image_generation_router, prefix="/api")
app.include_router(url_scraping_router, prefix="/api")
app.include_router(web_scraping_router, prefix="/api")
app.include_router(question_ingestion_router, prefix="/api")
app.include_router(config_router,prefix="/api/management/config")
app.include_router(tools_router, prefix="/api/management/tools", tags=["Agent"])
app.include_router(files_router, prefix="/api/management/files", tags=["Knowledge"])
app.include_router(
    llamacloud_router, prefix="/api/management/llamacloud", tags=["Llamacloud"]
)
app.include_router(loader_router, prefix="/api/management/loader", tags=["Knowledge"])
app.include_router(
    reranker_router, prefix="/api/management/reranker", tags=["Reranker"]
)


if __name__ == "__main__":
    app_host = os.getenv("APP_HOST", "0.0.0.0")
    app_port = int(os.getenv("APP_PORT", "5000"))
    reload = True if environment == "dev" else False

    uvicorn.run(app="main:app", host=app_host, port=app_port, reload=reload)
