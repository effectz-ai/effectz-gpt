import os

from app.engine.constants import DEFAULT_SYSTEM_PROMPT, DEFAULT_TOP_K
from app.engine.index import get_index
from fastapi import HTTPException
from llama_index.core.chat_engine import ContextChatEngine
from app.engine.index import get_index
from app.engine.raptor import get_raptor_retriever
from app.engine.node_postprocessors import get_metadata_replacement_post_processor, get_reranker


def get_chat_engine(filters=None):
    system_prompt = os.getenv("SYSTEM_PROMPT",DEFAULT_SYSTEM_PROMPT)

    top_k = int(os.getenv("TOP_K", DEFAULT_TOP_K))

    node_postprocessors = []

    if os.getenv("USE_RERANKER", "False").lower() == "true":
        node_postprocessors.append(get_reranker())

    if os.getenv("USE_SENTENCE_WINDOW_RETRIEVAL", "False").lower() == "true":
        node_postprocessors.append(get_metadata_replacement_post_processor())

    if os.getenv("USE_RAPTOR", "False").lower() == "true":
        retriever = get_raptor_retriever(top_k)
        if retriever is None:
            raise HTTPException(
                status_code=500,
                detail=str(
                    "RAPTOR retriever cannot be found"
                )
            )

        return ContextChatEngine.from_defaults(
            retriever=retriever,
            system_prompt=system_prompt,
            node_postprocessors=node_postprocessors
        )

    else:
        index = get_index()
        if index is None:
            raise HTTPException(
                status_code=500,
                detail=str(
                    "StorageContext is empty - call 'poetry run generate' to generate the storage first"
                ),
            )

        return index.as_chat_engine(
            similarity_top_k=top_k,
            system_prompt=system_prompt,
            node_postprocessors=node_postprocessors,
            chat_mode="condense_plus_context",
            filters=filters,
        )
