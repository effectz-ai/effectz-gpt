from dotenv import load_dotenv

load_dotenv()

import logging
import os

from app.engine.loaders import get_documents
from app.engine.vectordb import get_vector_store
from app.engine.raptor import raptor_ingestion
from app.settings import init_settings
from app.engine.node_preprocessors import get_sentence_window_node_parser
from llama_index.core.ingestion import IngestionPipeline
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.settings import Settings
from llama_index.core.storage import StorageContext
from llama_index.core.storage.docstore import SimpleDocumentStore

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

STORAGE_DIR = os.getenv("STORAGE_DIR", "storage")


def get_doc_store():

    # If the storage directory is there, load the document store from it.
    # If not, set up an in-memory document store since we can't load from a directory that doesn't exist.
    if os.path.exists(STORAGE_DIR):
        return SimpleDocumentStore.from_persist_dir(STORAGE_DIR)
    else:
        return SimpleDocumentStore()


def run_pipeline(docstore, vector_store, documents):
    transformations = []
    transformations.append(SentenceSplitter(
                chunk_size=Settings.chunk_size,
                chunk_overlap=Settings.chunk_overlap,
            ))
    transformations.append(Settings.embed_model)

    if os.getenv("USE_SENTENCE_WINDOW_RETRIEVAL", "True").lower() == "true":
        transformations.append(get_sentence_window_node_parser())
    
    pipeline = IngestionPipeline(
        transformations=transformations,
        docstore=docstore,
        docstore_strategy="upserts_and_delete",
        vector_store=vector_store,
    )

    # Run the ingestion pipeline and store the results
    nodes = pipeline.run(show_progress=True, documents=documents)

    return nodes


def persist_storage(docstore, vector_store):
    storage_context = StorageContext.from_defaults(
        docstore=docstore,
        vector_store=vector_store,
    )
    storage_context.persist(STORAGE_DIR)


def generate_datasource(loader_file):
    init_settings()
    logger.info("Generate index for the provided data")

    # Get the stores and documents or create new ones
    documents = get_documents(loader_file)
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


def generate_datasource_init():
    if os.getenv("USE_RAPTOR", "True").lower() == "true":
        raptor_ingestion("data/data_source")
    else:
        generate_datasource("loaders")


if __name__ == "__main__":
    generate_datasource_init()
