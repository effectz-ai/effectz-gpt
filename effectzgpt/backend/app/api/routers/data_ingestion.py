from dotenv import load_dotenv

load_dotenv()

import logging
import os
from typing import List

from fastapi import APIRouter, HTTPException, UploadFile, File
from llama_index.core.ingestion import IngestionPipeline
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.settings import Settings
from llama_index.core.storage import StorageContext
from llama_index.core.storage.docstore import SimpleDocumentStore

from app.engine.loaders import get_documents
from app.engine.vectordb import get_vector_store
from app.settings import init_settings

data_ingestion_router = r = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

STORAGE_DIR = os.getenv("STORAGE_DIR", "storage")
UPLOAD_FOLDER = 'data/data_source'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def get_doc_store():

    if os.path.exists(STORAGE_DIR):
        return SimpleDocumentStore.from_persist_dir(STORAGE_DIR)
    else:
        return SimpleDocumentStore()

def run_pipeline(docstore, vector_store, documents):
    pipeline = IngestionPipeline(
        transformations=[
            SentenceSplitter(
                chunk_size=Settings.chunk_size,
                chunk_overlap=Settings.chunk_overlap,
            ),
            Settings.embed_model,
        ],
        docstore=docstore,
        docstore_strategy="upserts_and_delete",
        vector_store=vector_store,
    )

    nodes = pipeline.run(show_progress=True, documents=documents)

    return nodes

def persist_storage(docstore, vector_store):
    storage_context = StorageContext.from_defaults(
        docstore=docstore,
        vector_store=vector_store,
    )
    storage_context.persist(STORAGE_DIR)

@r.post("/ingest_documents")
async def ingest_documents(files: List[UploadFile] = File(...)):
    try:
        init_settings()
        for file in files:
            file_path = os.path.join(UPLOAD_FOLDER, file.filename)
            with open(file_path, 'wb') as buffer:
                buffer.write(file.file.read())

        logger.info("Generate index for the provided data")

        # Get the stores and documents or create new ones
        documents = get_documents()
        # Set private=false to mark the document as public (required for filtering)
        for doc in documents:
            doc.metadata["private"] = "false"
        docstore = get_doc_store()
        vector_store = get_vector_store()

        # Run the ingestion pipeline
        _ = run_pipeline(docstore, vector_store, documents)

        # Build the index and persist storage
        persist_storage(docstore, vector_store)

        logger.info("Finished generating the index")
        return {'documents ingested': len(files)}

    except Exception as e:
        logger.error(f"An error occurred during ingestion: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")