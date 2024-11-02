# EffectzGPT by [Effectz.AI](https://www.effectz.ai/)  ![Logo of Effectz.AI](https://github.com/effectz-ai/effectz-gpt/blob/main/img/effectzai.png)

## Welcome to EffectzGPT
### EffectzGPT => Easy Workflow Automations with LLMs
EffectzGPT helps you quickly develop **Enterprise Workflow Automation Applications** powered by **Large Language Models (LLMs)**. It is specially designed for building scalable apps that require advanced reasoning over data. It has been used in both real-world business applications and cutting-edge research. EffectzGPT makes developing powerful AI-driven workflow automation applications simple, even if you're not an AI expert. EffectzGPT has been developed using [LlamaIndex](https://github.com/run-llama/llama_index).
\
\
[**Watch the Youtube demo of EffectzGPT ChatBot**](https://www.youtube.com/watch?v=C6k6pJ4MbOs)

- [💾 EffectzGPT Walkthrough](#effectzgpt-walkthrough)
- [✨ Feature Lists](#feature-lists)
- [🔑 API Keys](#api-keys)
- [💖 Trusted By Our Clients](#trusted-by-our-clients)
- [🚩 Used In Cutting Edge Research](#used-in-cutting-edge-research)


## EffectzGPT Walkthrough

### Setup The Environment

```
poetry install
poetry shell
```

### Import Your Data

```
poetry run generate
```

### Query Your Data

```
python main.py
```


## Feature Lists

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

| ✨ RAG Features         | Implemented | Description                                                    | Reference                                                                                                 |
| ----------------------- | ----------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Reranking               | ✅          | Rerank results based on context for improved results           |                                                                                                           |
| RAPTOR                  | ✅          | Raptor ingestion                                               | [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](https://arxiv.org/abs/2401.18059) |
| Supervised ICL          | ✅          | Supervised In-Context Learning                                 | [Many-Shot In-Context Learning](https://arxiv.org/abs/2404.11018)                                         |
| Unsupervised ICL        | ✅          | Unsupervised In-Context Learning                               | [Many-Shot In-Context Learning](https://arxiv.org/abs/2404.11018)                                         |
| Query Optimization      | planned ⏱️  | Optimization by PROmpting (OPRO)                               | [Large Language Models as Optimizers](https://arxiv.org/abs/2309.03409)                                    |
| Support for Hybrid RAG              | planned ⏱️  | Integrating Knowledge Graphs and Vector RAG                    | [HybridRAG: Integrating Knowledge Graphs and Vector Retrieval Augmented Generation for Efficient Information Extraction](https://arxiv.org/abs/2408.04948) |
| LlamaIndex Workflows Support   | planned ⏱️  | Event-driven abstraction used to chain together several events |                                                                                                   |
| Self-Route              | planned ⏱️  | Hybrid approach (RAG / LC LLM)                                 | [Retrieval Augmented Generation or Long-Context LLMs? A Comprehensive Study and Hybrid Approach](https://arxiv.org/abs/2407.16833) |
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

| 🤝 RAG Libraries | Implemented | Description                        |
| ---------------- | ----------- | ---------------------------------- |
| LlamaIndex       | ✅          | Implement LlamaIndex RAG pipelines |

| 🗄️ Vector DB Support | Implemented | Description                                          |
| -------------------- | ----------- | ---------------------------------------------------- |
| Chroma               | ✅          | AI-native open-source vector database                |
| Qdrant               | ✅          | Open-source vector database and vector search engine |
| Weaviate             | planned ⏱️  | Open-source vectore database                         |


## API Keys

Below is a comprehensive list of the API keys and variables you may require:

| Environment Variable   | Value                                                      | Description                                                                       |
| ---------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| MODEL_PROVIDER         | Your model provider name                                   | Set model provider                                                                |
| MODEL                  | Your model name                                            | Set model                                                                         |
| EMBEDDING_MODEL        | Your embedding model name                                  | Set embedding model                                                               |
| OPENAI_API_KEY         | Your OpenAI API key                                        | Set OpenAI API key                                                                |
| COHERE_API_KEY         | Your Cohere API key                                        | Set Cohere API key                                                                |


## Trusted By Our Clients

![Logo of University of Florida](https://github.com/effectz-ai/effectz-gpt/blob/main/img/uf.png) &nbsp;&nbsp;
![Logo of Chitra](https://github.com/effectz-ai/effectz-gpt/blob/main/img/chitra.png) &nbsp;&nbsp;
![Logo of Cleolinks AB](https://github.com/effectz-ai/effectz-gpt/blob/main/img/cleolinks.png)

## Used In Cutting Edge Research

| Name             | Reference                          |
| ---------------- | ---------------------------------- |
| RMF-GPT          | [RMF-GPT — OpenAI GPT-3.5 LLM, Blockchain, NFT, Model Cards and OpenScap Enabled Intelligent RMF Automation System](https://www.researchgate.net/publication/381616017_RMF-GPT_-_OpenAI_GPT-35_LLM_Blockchain_NFT_Model_Cards_and_OpenScap_Enabled_Intelligent_RMF_Automation_System) |
| SliceGPT         | [SliceGPT – OpenAI GPT-3.5 LLM, Blockchain and Non-Fungible Token Enabled Intelligent 5G/6G Network Slice Broker and Marketplace](https://www.researchgate.net/publication/379056571_SliceGPT_-_OpenAI_GPT-35_LLM_Blockchain_and_Non-Fungible_Token_Enabled_Intelligent_5G6G_Network_Slice_Broker_and_Marketplace) |
| DevSec-GPT       | [DevSec-GPT — Generative-AI (with Custom-Trained Meta's Llama2 LLM), Blockchain, NFT and PBOM Enabled Cloud Native Container Vulnerability Management and Pipeline Verification Platform](https://www.researchgate.net/publication/383132584_DevSec-GPT_-_Generative-AI_with_Custom-Trained_Meta%27s_Llama2_LLM_Blockchain_NFT_and_PBOM_Enabled_Cloud_Native_Container_Vulnerability_Management_and_Pipeline_Verification_Platform) |
