# EffectzGPT by [Effectz.AI](https://www.effectz.ai/)  ![Logo of Effectz.AI](https://github.com/effectz-ai/effectz-gpt/blob/main/img/effectzai.png)

## Welcome to EffectzGPT
### EffectzGPT => Easy Workflow Automations with LLMs
EffectzGPT helps you quickly develop **Enterprise Workflow Automation Applications** powered by **Large Language Models (LLMs)**. It is specially designed for building scalable apps that require advanced reasoning over data. It has been used in both real-world business applications and cutting-edge research. EffectzGPT makes developing powerful AI-driven workflow automation applications simple, even if you're not an AI expert. EffectzGPT has been developed using [LlamaIndex](https://github.com/run-llama/llama_index).
\
\
[**Watch the Youtube demo of EffectzGPT ChatBot**](https://www.youtube.com/watch?v=C6k6pJ4MbOs)

- [✨ Feature List](#feature-list)
- [💾 Getting Started](#getting-started)
- [🚀 Deploying With Docker Compose](#deploying-with-docker-compose)
- [💖 Trusted By Our Clients](#trusted-by-our-clients)
- [🚩 Used In Cutting Edge Research](#used-in-cutting-edge-research)
\
\
\
![Admin Panel](https://github.com/effectz-ai/effectz-gpt/blob/main/img/admin.png)
\
\
![Chat UI](https://github.com/effectz-ai/effectz-gpt/blob/main/img/chat.png)

## Feature List

| 🤖 Model Support                  | Implemented | Description                                             |
| --------------------------------- | ----------- | ------------------------------------------------------- |
| OpenAI (e.g. GPT4)                | ✅          | Embedding and Generation Models by OpenAI               |
| Ollama (e.g. Llama3)              | ✅          | Local Embedding and Generation Models powered by Ollama |
| Anthrophic (e.g. Claude Sonnet)   | ✅          | Embedding and Generation Models by Anthrophic           |

| 🤖 Embedding Support | Implemented | Description                              |
| -------------------- | ----------- | ---------------------------------------- |
| OpenAI               | ✅          | Embedding Models by OpenAI               |
| Ollama               | ✅          | Local Embedding Models powered by Ollama |

| 📁 Data Support                                          | Implemented | Description                                    |
| -------------------------------------------------------- | ----------- | ---------------------------------------------- |
| Document Ingestion                                       | ✅          | Ingest documents into EffectzGPT               |
| URL Scraping                                             | ✅          | Ingest data from urls into EffectzGPT          |


| 👨‍💻 Agent Features          | Implemented           | Description                                                          |
|----------------------------|-----------------------|----------------------------------------------------------------------|
| Agent with memory          | ✅                    | Agent with user specific memeory                                     |
| Agent workflow             | ✅                    | Agent with multistep workflow with access to tools                   |
| Agent memory management    | planned ⏱️            | Auto move memory between program memory and disk based on importance |


| ✨ RAG Features         | Implemented | Description                                                    | Reference                                                                                                 |
| ----------------------- | ----------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Reranking               | ✅          | Rerank results based on context for improved results           |                                                                                                           |
| Sentence window retrieval             | ✅                               | Sentence window retrieval   | [Production Ready Advanced RAG Optimization with Llama-Index and Qdrant Vector Database](https://medium.com/rahasak/production-ready-advanced-rag-optimization-with-llama-index-and-qdrant-vector-database-23ad6427b20a)                                                                                                          |
| RAPTOR                  | ✅          | Raptor ingestion                                               | [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](https://arxiv.org/abs/2401.18059) |
| Supervised ICL          | ✅          | Supervised In-Context Learning                                 | [Many-Shot In-Context Learning](https://arxiv.org/abs/2404.11018)                                         |
| Unsupervised ICL        | ✅          | Unsupervised In-Context Learning                               | [Many-Shot In-Context Learning](https://arxiv.org/abs/2404.11018)                                         |
| Query Optimization      | ✅          | Optimization by PROmpting (OPRO)                               | [Large Language Models as Optimizers](https://arxiv.org/abs/2309.03409)                                    |
| Support for Hybrid RAG              | planned ⏱️  | Integrating Knowledge Graphs and Vector RAG                    | [HybridRAG: Integrating Knowledge Graphs and Vector Retrieval Augmented Generation for Efficient Information Extraction](https://arxiv.org/abs/2408.04948) |
| LlamaIndex Workflows Support   | ✅  | Event-driven abstraction used to chain together several events |                                                                                                   |
| Self-Route              | ✅          | Hybrid approach (RAG / LC LLM)                                 | [Retrieval Augmented Generation or Long-Context LLMs? A Comprehensive Study and Hybrid Approach](https://arxiv.org/abs/2407.16833) |
| Secure ICL              | planned ⏱️  | Secure ICL implementation for security sensitive applications  | [Privacy-Preserving In-Context Learning with Differentially Private Few-Shot Generation](https://arxiv.org/abs/2309.11765) |
| Dense-X-Retrieval       | planned ⏱️  | Retrieval based on propoistions extracted from each node       | [Dense X Retrieval: What Retrieval Granularity Should We Use?](https://arxiv.org/abs/2312.06648) |
| Corrective RAG          | planned ⏱️  | Incorporating a self-correction mechanism that evaluates and refines retrieved knowledge       | [Corrective Retrieval Augmented Generation](https://arxiv.org/abs/2401.15884) |

| 🗡️ Chunking Techniques | Implemented | Description                       |
| ---------------------- | ----------- | --------------------------------- |
| Sentence               | ✅          | Chunk by Sentence                |

| 🆒 Cool Bonus         | Implemented | Description                                             |
| --------------------- | ----------- | ------------------------------------------------------- |
| Docker Support        | ✅          | EffectzGPT is deployable via Docker                     |
| Inbuilt ChatBot       | ✅          | A Next.js based ChatBot is available                    |
| Inbuilt Admin Panel   | ✅          | A Next.js based Admin Panel is available                |
| Whatsapp Intergration | ✅          | Whatsapp business API is supported                      |
| Messenger Intergration| ✅          | Facebook messenger API is supported                     |
| Streaming API         | ✅          | For Applications like chatbots                          |
| Non-Streaming API     | ✅          | For Non-streaming RAG applications                      |

| 🤝 RAG Libraries | Implemented | Description                        |
| ---------------- | ----------- | ---------------------------------- |
| LlamaIndex       | ✅          | Implement LlamaIndex RAG pipelines |

| 🗄️ Vector DB Support | Implemented | Description                                          |
| -------------------- | ----------- | ---------------------------------------------------- |
| Chroma               | ✅          | AI-native open-source vector database                |
| Qdrant               | ✅          | Open-source vector database and vector search engine |
| Weaviate             | planned ⏱️  | Open-source vectore database                         |

## Getting Started

To run EffectzGPT, you have to build a Docker image from the Dockerfile and start a docker container with that image.

### Prerequisites

Make sure you have the following installed on your system:

- node
- python 3.11
- Docker
- Docker Compose



### Environment Variables


| Environment Variable  | Example Values                 | Description                                                                    | Scope   | IsRequired |
|-----------------------|--------------------------------|--------------------------------------------------------------------------------|---------|------------|
| NEXT_PUBLIC_CHAT_API_BASE_URL  | http://localhost:5000 | Set backend API end point                                                      | UI      | Y          |
| APP_PORT              | 5000                           | Set port to start the backend app                                              | BACKEND | Y          |
| TOP_K                 | 10                             | Set number of similar embeddings to return                                     | BACKEND | Y          |
| VECTOR_STORE_PROVIDER | chroma                         | Set vector store provider                                                      | BACKEND | Y          |
| MODEL_PROVIDER        | openai                         | Set LLM provider                                                               | BACKEND | Y          |
| MODEL                 | gpt-3.5-turbo                  | Set LLM                                                                        | BACKEND | Y          | 
| EMBEDDING_MODEL       | text-embedding-3-large         | Set embedding model                                                            | BACKEND | Y          |
| OPENAI_API_KEY        | Your OpenAI API key            | Set OpenAI API key                                                             | BACKEND | Y          |
| SYSTEM_PROMPT         | Your system prompt             | Set system prompt                                                              | BACKEND | Y          |
| COHERE_API_KEY        | Your Cohere API key            | Set Cohere API key                                                             | BACKEND | Y          |
| STREAM_TIMEOUT        | 60000                          | Time out in ms for streaming a                                                 | BACKEND | N          |
| CHROMA_COLLECTION     | ./default                      | chroma collection name                                                         | BACKEND | N          |
| CHROMA_PATH           | ./chromadb                     | path to chroma file storage                                                    | BACKEND | N          |
| CHROMA_HOST           | localhost                      | chroma DB url ( if this value is defined CHROMA_PATH will be ignore )          | BACKEND | N          |
| CHROMA_PORT           | 8000                           | Chroma DB access port  ( if this value is defined CHROMA_PATH will be ignore ) | BACKEND | N          |
| EMBEDDING_DIM         | 1024                           | embedding size                                                                 | BACKEND | N          |
| LLAMA_CLOUD_API_KEY   | Your LLAMA cloud  API key      | LLAMA cloud key                                                                | BACKEND | N          |
| COHERE_API_KEY        | Your Cohere cloud  API key     | Cohere key                                                                     | BACKEND | N          |


### Endpoints

The docker container exposes the following endpoints.

- Admin Panel: http://localhost:3000/admin
- Chat UI: http://localhost:3000
- Docs UI: http://localhost:3000/docs

## Deploying With Docker Compose

You can easily deploy EffectzGPT to your own infrastructure with Docker Compose.

### Prerequisites

Make sure you have the following installed on your system:

- Docker
- Docker Compose

### Steps

- Clone the repository.

```
git clone https://github.com/effectz-ai/effectz-gpt.git

# navigate to backend folder and build docker image
cd effectz-gpt/backend
docker build -t effectzai/effectzgpt_b .

# navigate to frontend folder and build docker image
cd effectz-gpt/frontend
docker build -t effectzai/effectzgpt_f .

```

- Start frontend and backend services defined in the docker-compose.yml file.
```
docker-compose up -d effectzgpt_ui
```

- Or start a specific service (detached mode).
```
docker-compose up -d <service_name>
```

### Notes

- If you make changes to the code or Dockerfile, you may need to rebuild the images.

```
docker-compose up --build
```


The docker-compose.yml file uses environment variables. To set environment variables, you can follow one of the following methods.

- Using a .env file (create a .env file and define the environment variables).
```
VAR_NAME1=value1
```

- Exporting environment variables directly.
```
export VAR_NAME1=value1
```

Required and optional environment variable can be found above in [Environment Variables](#environment-variables)

## Trusted By Our Clients

[//]: # (![Logo of University of Florida]&#40;https://github.com/effectz-ai/effectz-gpt/blob/main/img/uf.png&#41; &nbsp;&nbsp;)
![Logo of Chitra](https://github.com/effectz-ai/effectz-gpt/blob/main/img/chitra.png) &nbsp;&nbsp;
![Logo of Cleolinks AB](https://github.com/effectz-ai/effectz-gpt/blob/main/img/cleolinks.png)

## Used In Cutting Edge Research

| Name             | Reference                          |
| ---------------- | ---------------------------------- |
| RMF-GPT          | [RMF-GPT — OpenAI GPT-3.5 LLM, Blockchain, NFT, Model Cards and OpenScap Enabled Intelligent RMF Automation System](https://www.researchgate.net/publication/381616017_RMF-GPT_-_OpenAI_GPT-35_LLM_Blockchain_NFT_Model_Cards_and_OpenScap_Enabled_Intelligent_RMF_Automation_System) |
| SliceGPT         | [SliceGPT – OpenAI GPT-3.5 LLM, Blockchain and Non-Fungible Token Enabled Intelligent 5G/6G Network Slice Broker and Marketplace](https://www.researchgate.net/publication/379056571_SliceGPT_-_OpenAI_GPT-35_LLM_Blockchain_and_Non-Fungible_Token_Enabled_Intelligent_5G6G_Network_Slice_Broker_and_Marketplace) |
| DevSec-GPT       | [DevSec-GPT — Generative-AI (with Custom-Trained Meta's Llama2 LLM), Blockchain, NFT and PBOM Enabled Cloud Native Container Vulnerability Management and Pipeline Verification Platform](https://www.researchgate.net/publication/383132584_DevSec-GPT_-_Generative-AI_with_Custom-Trained_Meta%27s_Llama2_LLM_Blockchain_NFT_and_PBOM_Enabled_Cloud_Native_Container_Vulnerability_Management_and_Pipeline_Verification_Platform) |
