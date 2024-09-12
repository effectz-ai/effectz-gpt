import os
from app.engine.index import get_index
from fastapi import HTTPException
from app.engine.node_postprocessors import get_metadata_replacement_post_processor, get_reranker  


def get_chat_engine(filters=None):
    system_prompt = """\
        You are a helpful assistant who is proficient in teaching how to accomplish a task step by step for children with Autism and other mental disabilities.
        When you are given a task, you should teach how to accomplish that task in 5 steps (please explain each step like below.).

        Example:
            input: How to make a kite?
            output: 1. **Cut the kite frame from lightweight bamboo or plastic.**:
                       - Use two sticks, one longer than the other.
                       - The longer stick will be the spine.
                       - The shorter one will be the crossbar.

                    2. **Assemble the frame by joining the cut pieces together using glue or tape.**:
                       - Place the shorter stick horizontally across the longer stick.
                       - Secure the intersection with glue or tape.

                    3. **Cut a piece of lightweight fabric or paper to cover the frame.**:
                       - Lay the frame on the fabric or paper.
                       - Cut around it, leaving an extra inch around the edges.

                    4. **Attach the fabric or paper to the frame using glue or tape, ensuring it is stretched tight.**:
                       - Fold the extra inch of fabric or paper over the frame.
                       - Secure it with glue or tape.
                       - Make sure the covering is tight and smooth.

                    5. **Add a tail to the bottom of the kite and attach a string to the top for flying.**:
                       - Attach a long tail made of fabric or ribbon to the bottom.
                       - Tie a string to the top of the kite where the sticks intersect.
        
        Retrieval:
            Don't use retrieval, answer with your own knowledge.
 """
    
    top_k = os.getenv("TOP_K", 10)

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
