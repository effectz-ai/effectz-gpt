import json
import re

from aiostream import stream
from fastapi import Request
from fastapi.responses import StreamingResponse
from llama_index.core.chat_engine.types import StreamingAgentChatResponse

from app.api.routers.events import EventCallbackHandler
from app.api.routers.models import ChatData, Message, SourceNodes
from app.api.services.suggestion import NextQuestionSuggestion
from app.engine.grafana import generate_panel


class VercelStreamResponse(StreamingResponse):
    """
    Class to convert the response from the chat engine to the streaming format expected by Vercel
    """

    TEXT_PREFIX = "0:"
    DATA_PREFIX = "8:"

    @classmethod
    def convert_text(cls, token: str):
        # Escape newlines and double quotes to avoid breaking the stream
        token = json.dumps(token)
        return f"{cls.TEXT_PREFIX}{token}\n"

    @classmethod
    def convert_data(cls, data: dict):
        data_str = json.dumps(data)
        return f"{cls.DATA_PREFIX}[{data_str}]\n"

    def __init__(
        self,
        request: Request,
        event_handler: EventCallbackHandler,
        response: StreamingAgentChatResponse,
        chat_data: ChatData,
    ):
        content = VercelStreamResponse.content_generator(
            request, event_handler, response, chat_data
        )
        super().__init__(content=content)

    @classmethod
    async def content_generator(
        cls,
        request: Request,
        event_handler: EventCallbackHandler,
        response: StreamingAgentChatResponse,
        chat_data: ChatData,
    ):
        # Yield the text response
        async def _chat_response_generator():
            final_response = ""
            async for token in response.async_response_gen():
                final_response += token

            yield VercelStreamResponse.convert_text("Done.")

            # Generate Grafana panel
            panel_config_pattern = r'(\[.*\])'

            panel_config_matches = re.search(panel_config_pattern, final_response, re.DOTALL)

            if panel_config_matches:
                try:
                    panel_config = json.loads(panel_config_matches.group(1))
                    generate_panel(panel_config)
                except json.JSONDecodeError as e:
                    print(f"Error: {e}")

            event_handler.is_done = True

            # Yield the source nodes
            yield cls.convert_data(
                {
                    "type": "sources",
                    "data": {
                        "nodes": [
                            SourceNodes.from_source_node(node).dict()
                            for node in response.source_nodes
                        ]
                    },
                }
            )

        is_stream_started = False
        async for output in _chat_response_generator():
            if not is_stream_started:
                is_stream_started = True
                # Stream a blank message to start the stream
                yield VercelStreamResponse.convert_text("")

            yield output

            if await request.is_disconnected():
                break
