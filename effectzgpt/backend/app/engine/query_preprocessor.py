from dotenv import load_dotenv

load_dotenv()

import os
import sys
import logging
import chromadb
from pymongo import MongoClient
from pymongo.server_api import ServerApi

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

# Create a new client and connect to the MongoDB server
mongo_uri = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017/")
mongo_client = MongoClient(mongo_uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    mongo_client.admin.command('ping')
    logger.info("Successfully connected to MongoDB!\n")
except Exception as e:
    logger.info(f"Error connecting to MongoDB: {e}\n")
    sys.exit(1)

# Setup mongodb collection
mongo_db = mongo_client[os.getenv("MONGO_DB", "EffectzGPT")]
mongo_collection = mongo_db[os.getenv("MONGO_COLLECTION", "QandA")]
logger.info(f"Collection: {mongo_collection}\n") 

# Setup Chroma
collection_name = os.getenv("CHROMA_COLLECTION_QUESTIONS", "questions")
chroma_path = os.getenv("CHROMA_PATH")

if chroma_path:
    chroma_client = chromadb.PersistentClient(path=chroma_path)
else:
    if not os.getenv("CHROMA_HOST") or not os.getenv("CHROMA_PORT"):
        raise ValueError(
            "Please provide either CHROMA_PATH or CHROMA_HOST and CHROMA_PORT"
        )
    chroma_client = chromadb.HttpClient(host=os.getenv("CHROMA_HOST"), port=int(os.getenv("CHROMA_PORT")))

collection = chroma_client.get_or_create_collection(name=collection_name)

# Add questions to retrieve similar questions
def add_questions(questions, ids):
    collection.upsert(
        documents=questions,
        ids=ids
    )
    logger.info("Finished adding questions\n")

# Get similar questions (ICL)
def add_icl(user_question, no_of_questions):
    try:
        results = collection.query(
            query_texts=[user_question], 
            n_results=no_of_questions 
        )
        similar_questions = results['documents'][0]

        prompt = ""

        if os.getenv("ICL_SUPERVISED", "True").lower() == "true":
            document_name = os.getenv("MONGO_DOCUMENT")

            if document_name:
                agg_pipeline = [
                    {
                        "$project": {
                            document_name: {
                                "$filter": {
                                    "input": f"${document_name}",
                                    "as": "item",
                                    "cond": {"$in": ["$$item.question", similar_questions]}
                                }
                            },
                            "_id": 0 
                        }
                    }
                ]

                db_query_results = mongo_collection.aggregate(agg_pipeline)

                prompt += "\n\nConsider these similar questions and their answers to generate the correct answer for the user question.\n\n"

                for result in db_query_results:
                    prompt += "\n".join([f"Q: {qa['question']}\nA: {qa['answer']}\n" for qa in result[document_name]])
                    break
        
                prompt += f"\nQ: {user_question}\nA:"   

            else:
                if not os.getenv("MONGO_DOCUMENT"):
                    raise ValueError(
                        "Please provide MONGO_DOCUMENT"
                    )
                    
        else:
            prompt += "\n\nConsider these similar questions to generate the correct answer for the user question.\n\n"
            prompt += "\n".join([f"{q}\n" for q in similar_questions])
            prompt += f"\nUser Question: {user_question}"    
        
        return prompt
    
    except Exception as e:
        logger.error(f"An error occurred during adding ICL: {str(e)}")