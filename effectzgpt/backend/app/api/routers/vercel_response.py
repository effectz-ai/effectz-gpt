import json
import re

from aiostream import stream
from fastapi import Request
from fastapi.responses import StreamingResponse
from llama_index.core.chat_engine.types import StreamingAgentChatResponse

from app.api.routers.events import EventCallbackHandler
from app.api.routers.models import ChatData, Message, SourceNodes
from app.api.services.suggestion import NextQuestionSuggestion
from app.engine.prompt_generator import generate_prompts
from app.engine.image_generator import generate_image


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
                yield VercelStreamResponse.convert_text(token)

            # Extract steps
            steps = re.findall(r'\d+\.\s\*\*(.*?)\*\*:\n\s*-\s*(.*?)\n(?:\s*-\s*(.*?))?\n(?:\s*-\s*(.*?))?\n(?:\s*-\s*(.*?))?\n?', final_response, re.DOTALL)
            
            # Format the extracted steps for further processing
            formatted_steps = []

            for step in steps:
                step_title = step[0].strip()
                step_actions = [action.strip() for action in step[1:] if action.strip()]
                step_text = f"{step_title}: " + " ".join(step_actions)
                formatted_steps.append(step_text)

            # Generate prompts for each step
            prompt_array = generate_prompts(formatted_steps)

            # Genrate image urls
            image_array = []

            for prompt in prompt_array:
                item = generate_image(prompt)
                image_array.append(item[0]['url'])

            # Generate questions that user might interested to
            # conversation = chat_data.messages + [
            #     Message(role="assistant", content=final_response)
            # ]
            # questions = await NextQuestionSuggestion.suggest_next_questions(
            #     conversation
            # )
            
            if len(image_array) > 0:
                yield VercelStreamResponse.convert_data(
                    {
                        "type": "image",
                        "data": image_array,
                    }
                )

            # the text_generator is the leading stream, once it's finished, also finish the event stream
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

        # Yield the events from the event handler
        async def _event_generator():
            async for event in event_handler.async_event_gen():
                event_response = event.to_response()
                if event_response is not None:
                    yield VercelStreamResponse.convert_data(event_response)

        combine = stream.merge(_chat_response_generator(), _event_generator())
        is_stream_started = False
        async with combine.stream() as streamer:
            async for output in streamer:
                if not is_stream_started:
                    is_stream_started = True
                    # Stream a blank message to start the stream
                    yield VercelStreamResponse.convert_text("")

                yield output

                if await request.is_disconnected():
                    break
