
## Endpoints

|     **Endpoint**     |         **Description**          |                                   **Input Parameters**                                    |
|:--------------------:|:--------------------------------:|:-----------------------------------------------------------------------------------------:|
|  `/generate_images`  | Generate images using OpenAI API |                                         a prompt                                          |
| `/ingest_documents`  |   Add documents for retrieval    |                                    a list of documents                                    |
| `/ingest_questions`  |      Add questions for ICL       |                            a list of questions, a list of ids                             |
|    `/scrape_web`     |      Scrape given websites       |    a JSON array of JSON objects with key-value pairs (base_url, prefix and max_depth)     |
|     `/api/agent`     |     agent streaming endpoint     |                                         ChatData                                          |
| `/api/agent/request` |   agent non-streaming endpoint   |                                         ChatData                                          |
|     `/api/chat`      |     chat streaming endpoint      |                                         ChatData                                          |
| `/api/chat/request`  |   chat non-streaming endpoint    |                                         ChatData                                          |