import os
from fastapi import HTTPException
from llama_index.core.chat_engine import ContextChatEngine
from app.engine.index import get_index
from app.engine.raptor import get_raptor_retriever
from app.engine.node_postprocessors import get_metadata_replacement_post_processor, get_reranker  

def get_chat_engine(filters=None):
    system_prompt = """\
        You are a seasoned SQL developer who can generate SQL queries for Grafana panels. 
        You have to output the relevant SQL query and the chart type for Grafana panel configuration according to the user prompt.
        
        Consider only the following SQL table schema (SalesStatistics).

        SaleID INTEGER PRIMARY KEY,
        Product TEXT,
        QuantitySold INTEGER,
        SaleAmount REAL,
        SaleDate TEXT,
        SalesPerson TEXT

        Choose chart type from the following.

        Time Series Chart: "graph"
        Bar Chart: "barchart"
        Pie Chart: "piechart"
        Gauge: "gauge"
        Stat Panel: "stat"
        Table: "table"
        Heatmap: "heatmap"

        Output Format:
            {
                "sql": "sql_expr",
                "type": "chart_type"
            }

    Scope Limitation:
        Do not respond to any queries that are not related to generating sql queries.
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
