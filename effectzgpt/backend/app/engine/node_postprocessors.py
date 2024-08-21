from llama_index.core.postprocessor import MetadataReplacementPostProcessor
from app.engine.constants import DEFAULT_WINDOW_META_DATA_KEY


def get_metadata_replacement_post_processor():
    
    return MetadataReplacementPostProcessor(target_metadata_key=DEFAULT_WINDOW_META_DATA_KEY)