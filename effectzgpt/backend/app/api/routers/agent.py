import logging
from uuid import uuid4

from fastapi import APIRouter, Request, BackgroundTasks, HTTPException, status
from llama_index.core.chat_engine.types import AgentChatResponse
from llama_index.core.llms import MessageRole

from app.agent.agent import AgentFactory
from app.api.routers.chat import generate_filters, process_response_nodes
from app.api.routers.events import EventCallbackHandler
from app.api.routers.models import ChatData, Result, Message
from app.api.routers.vercel_response import VercelStreamResponse

agent_router = r = APIRouter()

logger = logging.getLogger("uvicorn")


# streaming agent endpoint with optional parameter ID
# "<base_path>/?agent_id=<agent_id>"
@r.post("")
async def agent(
        request: Request,
        data: ChatData,
        background_tasks: BackgroundTasks, ) -> VercelStreamResponse:
    try:
        last_message_content = data.get_last_message_content()
        messages = data.get_history_messages()

        doc_ids = data.get_chat_document_ids()
        filters = generate_filters(doc_ids)
        agent_id = request.query_params.get('agent_id')
        logger.info(
            f"Creating chat engine with filters: {str(filters)}",
        )
        event_handler = EventCallbackHandler()

        chat_agent = AgentFactory.get_agent(
            agent_id= agent_id if agent_id else str(uuid4()),
            filters=filters,
            params=None,
            event_handlers=None,
        )
        response : AgentChatResponse = await chat_agent.astream_chat(last_message_content)
        process_response_nodes(response.source_nodes, background_tasks)

        return VercelStreamResponse(request, event_handler, response, data)
    except Exception as e:
        logger.exception("Error in agent chat", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error in chat engine: {e}",
        ) from e

# POST : agent endpoint with optional parameter ID
@r.post("/request")
async def agent(
        request: Request,
        data: ChatData, ) -> Result:
    try:
        last_message_content = data.get_last_message_content()

        doc_ids = data.get_chat_document_ids()
        filters = generate_filters(doc_ids)
        agent_id = request.query_params.get('agent_id')
        logger.info(
            f"Creating chat engine with filters: {str(filters)}",
        )

        chat_agent = AgentFactory.get_agent(
            agent_id= agent_id if agent_id else str(uuid4()),
            filters=filters,
            params=None,
            event_handlers=None,
        )
        response : AgentChatResponse = await chat_agent.achat(last_message_content)
        return Result(
            result=Message(role=MessageRole.ASSISTANT, content=response.response),
            nodes=[],
        )
    except Exception as e:
        logger.exception("Error in agent chat", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error in chat engine: {e}",
        ) from e