import os
from fastapi import HTTPException
from llama_index.core.chat_engine import ContextChatEngine
from app.engine.index import get_index
from app.engine.raptor import get_raptor_retriever
from app.engine.node_postprocessors import get_metadata_replacement_post_processor, get_reranker  

def get_chat_engine(filters=None):
    system_prompt = """\
        You are an expert who can write SQL queries to generate Grafana panels. 
        You have to output the relevant Grafana panel configuration according to the user prompt.
            - For a time series, make sure to handle the x-axis variable by using STRFTIME("%s", x-axis variable) and aliasing it as time in the SQL query. 
            - For a pie chart, set values as true in reduceOptions in options.
            - Use "frser-sqlite-datasource" as the datasource and generated SQL query as the rawQueryText. Add both of them to the targets key. 
            - Use a relevant title.
            - Set 12 for h and w for the gridPos key.
            - If their is a color requested for the panel by the user, add it to color in defaults in fieldConfig. Then the color mode should be 'fixed'.
        
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
        Stat Panel: "stat"
        Table: "table"

        Output Format:
            Only output a dictionary containing the Grafana panel configuration. 

    Scope Limitation:
        Do not respond to any queries that are not related to generating Grafana panel configurations.
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
