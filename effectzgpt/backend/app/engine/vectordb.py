import os
from app.engine.vectordbs.chroma import get_vector_store as get_chroma_vector_store


def get_vector_store():
    vector_store_provider = os.getenv("VECTOR_STORE_PROVIDER", "chroma")
    if vector_store_provider == "chroma":
        return get_chroma_vector_store()
