from pathlib import Path
from typing import Any

import chromadb
import pandas as pd
from chromadb.utils.embedding_functions import DefaultEmbeddingFunction

BACKEND_DIR = Path(__file__).resolve().parents[2]
KNOWLEDGE_FILE = BACKEND_DIR / "knowledge" / "chunks.xlsx"
VECTOR_DB_DIR = BACKEND_DIR / "vectordb"
COLLECTION_NAME = "green-shade-flora-knowledge"


def load_chunks() -> pd.DataFrame:
    """Load the already-chunked knowledge source without modifying it."""
    if not KNOWLEDGE_FILE.exists():
        raise FileNotFoundError(f"Knowledge source not found: {KNOWLEDGE_FILE}")

    try:
        chunks = pd.read_excel(KNOWLEDGE_FILE, usecols=["id", "text"])
    except ValueError:
        # The current source is CSV-formatted despite its .xlsx filename.
        chunks = pd.read_csv(KNOWLEDGE_FILE, usecols=["id", "text"])
    chunks = chunks.dropna(subset=["text"])
    chunks["text"] = chunks["text"].astype(str).str.strip()
    return chunks[chunks["text"].ne("")]


def get_collection() -> Any:
    """Open the persistent Chroma collection, creating it only when absent."""
    client = chromadb.PersistentClient(path=str(VECTOR_DB_DIR))
    collection = client.get_or_create_collection(
        name=COLLECTION_NAME,
        embedding_function=DefaultEmbeddingFunction(),
        metadata={"hnsw:space": "cosine"},
    )

    if collection.count() == 0:
        chunks = load_chunks()
        collection.add(
            ids=[str(chunk_id) for chunk_id in chunks["id"]],
            documents=chunks["text"].tolist(),
            metadatas=[{"source": str(KNOWLEDGE_FILE.name)} for _ in chunks.index],
        )

    return collection


if __name__ == "__main__":
    collection = get_collection()
    print(f"Indexed chunks: {collection.count()}")
    