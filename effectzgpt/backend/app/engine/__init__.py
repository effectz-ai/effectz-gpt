import os

from app.engine.constants import DEFAULT_SYSTEM_PROMPT, DEFAULT_TOP_K
from app.engine.index import get_index
from fastapi import HTTPException
from app.engine.node_postprocessors import get_metadata_replacement_post_processor, get_reranker  


def get_chat_engine(filters=None):
    system_prompt = os.getenv("SYSTEM_PROMPT",DEFAULT_SYSTEM_PROMPT)

    top_k = os.getenv("TOP_K", DEFAULT_TOP_K)

    index = get_index()
    if index is None:
        raise HTTPException(
            status_code=500,
            detail=str(
                "StorageContext is empty - call 'poetry run generate' to generate the storage first"
            ),
        )
        
    node_postprocessors = []

    if os.getenv("USE_RERANKER", "True").lower() == "true":
        node_postprocessors.append(get_reranker())

    if os.getenv("USE_SENTENCE_WINDOW_RETRIEVAL", "True").lower() == "true":
        node_postprocessors.append(get_metadata_replacement_post_processor())

    return index.as_chat_engine(
        similarity_top_k=int(top_k),
        system_prompt=system_prompt,
        node_postprocessors=node_postprocessors,
        chat_mode="condense_plus_context",
        filters=filters,
    )
