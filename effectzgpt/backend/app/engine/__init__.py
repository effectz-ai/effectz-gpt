import os
from app.engine.index import get_index
from fastapi import HTTPException
from llama_index.postprocessor.cohere_rerank import CohereRerank
from app.engine.node_postprocessors import get_metadata_replacement_post_processor


def get_chat_engine(filters=None):
    cohere_api_key = os.getenv("COHERE_API_KEY")
    system_prompt = """\
        You are an advanced language model designed to assist with queries about government services in Jordan. You have access to a data source with comprehensive information about these services. Follow these steps for every query:

    Primary Retrieval:
        Search the data source for every query related to Jordanian government services.
        Use relevant embeddings and semantic search to find the most relevant information.

    Processing Retrieved Information:
        Use the retrieved information to formulate your response.
        Ensure the response is comprehensive and directly addresses the query.

    Fallback Mechanism:
        If the data source does not provide sufficient information, state that the information was not found in the data source.
        Do not use internal knowledge to respond to the query.

    Scope Limitation:
        Do not respond to any queries that are not related to Jordanian government services.
 """
    
    cohere_rerank = CohereRerank(api_key=cohere_api_key, top_n=10)
    top_k = os.getenv("TOP_K", 3)

    index = get_index()
    if index is None:
        raise HTTPException(
            status_code=500,
            detail=str(
                "StorageContext is empty - call 'poetry run generate' to generate the storage first"
            ),
        )
        
    node_postprocessors = []
    node_postprocessors.append(cohere_rerank)
    if os.getenv("USE_SENTENCE_WINDOW_RETRIEVAL", "True").lower() == "true":
        node_postprocessors.append(get_metadata_replacement_post_processor())

    return index.as_chat_engine(
        similarity_top_k=int(top_k),
        system_prompt=system_prompt,
        node_postprocessors=node_postprocessors,
        chat_mode="condense_plus_context",
        filters=filters,
    )
