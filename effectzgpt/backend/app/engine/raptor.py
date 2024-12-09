from dotenv import load_dotenv

load_dotenv()

import logging
import os

from llama_index.core import SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.settings import Settings
from llama_index.core.extractors import TitleExtractor
from llama_index.core.ingestion import IngestionPipeline
from app.settings import init_settings
from app.engine.vectordb import get_vector_store

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

init_settings()

vector_store = get_vector_store()

def raptor_ingestion(path):
    from llama_index.packs.raptor import RaptorPack, RaptorRetriever
    logger.info("Generate RaptorPack for the provided data")
    data_dir = os.path.abspath(path)
    documents = SimpleDirectoryReader(input_dir=data_dir).load_data()

    pipeline = IngestionPipeline(
        transformations=[
            SentenceSplitter(chunk_size=100, chunk_overlap=0),
            TitleExtractor(),
            Settings.embed_model,
        ]
    )

    pack = RaptorPack(documents, llm=Settings.llm, embed_model=Settings.embed_model, vector_store=vector_store)

    pipeline.run(pack)

    logger.info("Generation completed!")

def get_raptor_retriever(top_k = 10):
    logger.info("Get RAPTOR retriever")
    retriever = RaptorRetriever(
        [],
        embed_model=Settings.embed_model, 
        llm=Settings.llm,
        vector_store=vector_store,  
        similarity_top_k=top_k,
        mode="tree_traversal",
    )
    return retriever

