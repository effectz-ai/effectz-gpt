import os
from llama_index.core.postprocessor import MetadataReplacementPostProcessor
from app.engine.constants import DEFAULT_WINDOW_META_DATA_KEY
from app.engine.reranker import get_cohere_reranker


def get_metadata_replacement_post_processor():
    
    return MetadataReplacementPostProcessor(target_metadata_key=DEFAULT_WINDOW_META_DATA_KEY)

def get_reranker():
    cohere_api_key = os.getenv("COHERE_API_KEY")
    
    if cohere_api_key:
        return get_cohere_reranker()
    else:
        raise ValueError("Cohere API key is not available.")

    