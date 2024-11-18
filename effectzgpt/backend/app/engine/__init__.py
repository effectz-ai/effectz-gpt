import os
from fastapi import HTTPException
from llama_index.core.chat_engine import ContextChatEngine
from app.engine.index import get_index
from app.engine.raptor import get_raptor_retriever
from app.engine.node_postprocessors import get_metadata_replacement_post_processor, get_reranker  

def get_chat_engine(filters=None):
    system_prompt = """\
        You are an advanced language model designed to assist with queries about Kings Hospital Colombo. You have access to a data source with comprehensive information about this hospital. Follow these steps for every query:

    Welcome Message :
        Welcome to Kings Hospital How can i assist You
        
    Primary Retrieval:
        Search the data source for every query related to Kings Hospital Colombo.
        Use relevant embeddings and semantic search to find the most relevant information.

    Processing Retrieved Information:
        Use the retrieved information to formulate your response.
        Ensure the response is comprehensive and directly addresses the query.

    Fallback Mechanism:
        If the data source does not provide sufficient information, state that the information was not found in the data source.
        Do not use internal knowledge to respond to the query.

    Scope Limitation:
        Do not respond to any queries that are not related to Kings Hospital Colombo.
 """
    
    top_k = int(os.getenv("TOP_K", 10))

    node_postprocessors = []

    if os.getenv("USE_RERANKER", "True").lower() == "true":
        node_postprocessors.append(get_reranker())

    if os.getenv("USE_SENTENCE_WINDOW_RETRIEVAL", "True").lower() == "true":
        node_postprocessors.append(get_metadata_replacement_post_processor())

    if os.getenv("USE_RAPTOR", "True").lower() == "true":
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
