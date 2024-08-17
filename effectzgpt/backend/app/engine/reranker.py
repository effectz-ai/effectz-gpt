import os
from app.engine.constants import DEFAULT_TOP_K
from llama_index.postprocessor.cohere_rerank import CohereRerank

def get_cohere_reranker():
    api_key = os.getenv("COHERE_API_KEY")
    top_k = int(os.getenv("TOP_K", DEFAULT_TOP_K))

    if api_key is None:
        raise ValueError(
            "Please set your COHERE_API_KEY. Get it from https://dashboard.cohere.com/api-keys"
        )

    return CohereRerank(
        api_key=api_key,
        top_n=top_k,
    )