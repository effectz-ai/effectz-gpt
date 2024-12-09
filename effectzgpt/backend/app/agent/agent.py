import os
from threading import Lock
from typing import Dict

from llama_index.core.agent import AgentRunner
from llama_index.core.callbacks import CallbackManager
from llama_index.core.memory import SimpleComposableMemory, ChatMemoryBuffer
from llama_index.core.settings import Settings
from llama_index.core.tools.query_engine import QueryEngineTool

from app.agent.reActWorkflowAgnet import ReActAgent
from app.engine.index import get_index
from app.engine.tools import ToolFactory


class AgentFactory:
    _instances: Dict[str, AgentRunner|ReActAgent] = {}
    _lock = Lock()

    @classmethod
    def get_agent(cls, agent_id: str, filters=None, params=None, event_handlers=None, is_react_agent:bool=False) -> AgentRunner|ReActAgent:
        """
        Creates a new agent or returns an existing one based on the agent_id.

        Args:
            agent_id (str): Unique identifier for the agent
            filters: Query filters for the agent
            params: Additional parameters for agent configuration
            event_handlers: Event handlers for callback management
            is_react_agent (bool): Whether the agent is workflow reActAgent or not

        Returns:
            AgentRunner: New or existing agent instance
        """
        agent_id =  agent_id + "_react_agent" if is_react_agent else agent_id
        if agent_id not in cls._instances:
            with cls._lock:
                if agent_id not in cls._instances:
                    agent = cls._create_chat_agent(agent_id, filters, params, event_handlers, is_react_agent)
                    cls._instances[agent_id] = agent

        return cls._instances[agent_id]

    @classmethod
    def remove_agent(cls, agent_id: str) -> None:
        """
        Removes an agent from the factory.

        Args:
            agent_id (str): ID of the agent to remove
        """
        with cls._lock:
            if agent_id in cls._instances:
                del cls._instances[agent_id]

    @classmethod
    def clear_all_agents(cls) -> None:
        """
        Removes all agents from the factory in a thread-safe manner.
        """
        with cls._lock:
            cls._instances.clear()

    @classmethod
    def _create_chat_agent(cls,agent_id: str, filters=None, params=None, event_handlers=None,is_react_agent:bool=False) -> AgentRunner|ReActAgent:
        system_prompt = os.getenv("SYSTEM_PROMPT")
        top_k = int(os.getenv("TOP_K", 0))
        tools = []
        callback_manager = CallbackManager(handlers=event_handlers or [])

        # Add query tool if index exists
        index = get_index()
        if index is not None:
            query_engine = index.as_query_engine(
                filters=filters, **({"similarity_top_k": top_k} if top_k != 0 else {})
            )
            query_engine_tool = QueryEngineTool.from_defaults(query_engine=query_engine)
            tools.append(query_engine_tool)

        # Add additional tools
        tools += ToolFactory.from_env()

        composable_memory : SimpleComposableMemory =  SimpleComposableMemory.from_defaults(
            primary_memory = ChatMemoryBuffer.from_defaults(chat_store_key= agent_id))

        if is_react_agent:
            return ReActAgent(
                llm=Settings.llm, tools=tools, timeout=120, verbose=True, agent_id = agent_id,
            )
        else:
            return AgentRunner.from_llm(
                llm=Settings.llm,
                tools=tools,
                system_prompt=system_prompt,
                callback_manager=callback_manager,
                verbose=True,
                memory=composable_memory
            )



