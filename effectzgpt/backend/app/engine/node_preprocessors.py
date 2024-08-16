import os
from app.engine.constants import DEFAULT_WINDOW_SIZE
from llama_index.core.node_parser import SentenceWindowNodeParser
from app.engine.constants import DEFAULT_WINDOW_META_DATA_KEY, ORIGINAL_TEXT_METADATA_KEY

def get_sentence_window_node_parser():
    sentence_window_size = int(os.getenv("WINDOW_SIZE", DEFAULT_WINDOW_SIZE))
    node_parser = SentenceWindowNodeParser.from_defaults(
        window_size=sentence_window_size,
        window_metadata_key=DEFAULT_WINDOW_META_DATA_KEY,
        original_text_metadata_key=ORIGINAL_TEXT_METADATA_KEY,
    )
    return node_parser