# EffectzGPT by Effectz.AI  ![Logo of Effectz.AI](https://github.com/effectz-ai/effectz-gpt/img/effectzai.png)

## Welcome to EffectzGPT
### EffectzGPT: Easily Build Data Apps with LLMs
EffectzGPT helps you quickly create data applications powered by Large Language Models (LLMs). Based on LlamaIndex, it's specially designed for building scalable apps that require advanced reasoning over data. It has been used in both real-world business applications and cutting-edge research. EffectzGPT makes developing powerful AI-driven data applications simple—even if you're not an AI expert.
\
\
![Demo of EffectzGPT](https://github.com/effectz-ai/effectz-gpt/img/effectzgpt-fe.png)

- [🎯 Welcome to EffectzGPT](#welcome-to-effectzgpt)
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

| ✨ RAG Features         | Implemented | Description                                           | Reference         |
| ----------------------- | ----------- | ----------------------------------------------------- | ----------------- |
| Reranking               | ✅          | Rerank results based on context for improved results |                   |
| RAPTOR                  | ✅          | Raptor ingestion                                     | [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](https://arxiv.org/abs/2401.18059) |
| Supervised ICL          | ✅          | Supervised In-Context Learning                       |                   |
| Unsupervised ICL        | ✅          | Unsupervised In-Context Learning                     |                   |
| Self-Route              | planned ⏱️  | Hybrid approach (RAG / LC LLM)                       | [Retrieval Augmented Generation or Long-Context LLMs? A Comprehensive Study and Hybrid Approach](https://arxiv.org/abs/2407.16833) |

| 🗡️ Chunking Techniques | Implemented | Description                       |
| ---------------------- | ----------- | --------------------------------- |
| Sentence               | ✅          | Chunk by Sentence                |

| 🆒 Cool Bonus         | Implemented | Description                                             |
| --------------------- | ----------- | ------------------------------------------------------- |
| Docker Support        | ✅          | EffectzGPT is deployable via Docker                     |

| 🤝 RAG Libraries | Implemented | Description                        |
| ---------------- | ----------- | ---------------------------------- |
| LlamaIndex       | ✅          | Implement LlamaIndex RAG pipelines |


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

![Logo of University of Florida](https://github.com/effectz-ai/effectz-gpt/img/uf.png) &nbsp;&nbsp;
![Logo of Chitra](https://github.com/effectz-ai/effectz-gpt/img/chitra.png) &nbsp;&nbsp;
![Logo of Cleolinks AB](https://github.com/effectz-ai/effectz-gpt/img/cleolinks.png)

## Used In Cutting Edge Research

| Name             | Reference                          |
| ---------------- | ---------------------------------- |
| RMF-GPT          | [RMF-GPT — OpenAI GPT-3.5 LLM, Blockchain, NFT, Model Cards and OpenScap Enabled Intelligent RMF Automation System](https://www.researchgate.net/publication/381616017_RMF-GPT_-_OpenAI_GPT-35_LLM_Blockchain_NFT_Model_Cards_and_OpenScap_Enabled_Intelligent_RMF_Automation_System) |
| SliceGPT         | [SliceGPT – OpenAI GPT-3.5 LLM, Blockchain and Non-Fungible Token Enabled Intelligent 5G/6G Network Slice Broker and Marketplace](https://www.researchgate.net/publication/379056571_SliceGPT_-_OpenAI_GPT-35_LLM_Blockchain_and_Non-Fungible_Token_Enabled_Intelligent_5G6G_Network_Slice_Broker_and_Marketplace) |
| DevSec-GPT       | [DevSec-GPT — Generative-AI (with Custom-Trained Meta's Llama2 LLM), Blockchain, NFT and PBOM Enabled Cloud Native Container Vulnerability Management and Pipeline Verification Platform](https://www.researchgate.net/publication/383132584_DevSec-GPT_-_Generative-AI_with_Custom-Trained_Meta%27s_Llama2_LLM_Blockchain_NFT_and_PBOM_Enabled_Cloud_Native_Container_Vulnerability_Management_and_Pipeline_Verification_Platform) |