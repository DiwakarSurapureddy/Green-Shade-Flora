from pathlib import Path
from typing import Any

BACKEND_DIR = Path(__file__).resolve().parents[2]
KNOWLEDGE_FILE = BACKEND_DIR / "knowledge" / "chunks.xlsx"
VECTOR_DB_DIR = BACKEND_DIR / "vectordb"
COLLECTION_NAME = "green-shade-flora-knowledge"

try:
    import chromadb
    import pandas as pd
    from chromadb.utils.embedding_functions import DefaultEmbeddingFunction
    CHROMADB_AVAILABLE = True
except (ImportError, ModuleNotFoundError):
    chromadb = None
    pd = None
    DefaultEmbeddingFunction = None
    CHROMADB_AVAILABLE = False


def load_chunks() -> Any:
    """Load the already-chunked knowledge source without modifying it."""
    if not CHROMADB_AVAILABLE or pd is None:
        return None
    if not KNOWLEDGE_FILE.exists():
        return None

    try:
        chunks = pd.read_excel(KNOWLEDGE_FILE, usecols=["id", "text"])
    except Exception:
        try:
            chunks = pd.read_csv(KNOWLEDGE_FILE, usecols=["id", "text"])
        except Exception:
            return None
    chunks = chunks.dropna(subset=["text"])
    chunks["text"] = chunks["text"].astype(str).str.strip()
    return chunks[chunks["text"].ne("")]


def get_collection() -> Any:
    """Open the persistent Chroma collection, creating it only when absent."""
    if not CHROMADB_AVAILABLE or chromadb is None:
        return None

    try:
        client = chromadb.PersistentClient(path=str(VECTOR_DB_DIR))
        collection = client.get_or_create_collection(
            name=COLLECTION_NAME,
            embedding_function=DefaultEmbeddingFunction(),
            metadata={"hnsw:space": "cosine"},
        )

        if collection.count() == 0:
            chunks = load_chunks()
            if chunks is not None:
                collection.add(
                    ids=[str(chunk_id) for chunk_id in chunks["id"]],
                    documents=chunks["text"].tolist(),
                    metadatas=[{"source": str(KNOWLEDGE_FILE.name)} for _ in chunks.index],
                )

        return collection
    except Exception as e:
        print(f"Warning: ChromaDB collection initialization failed: {e}")
        return None


if __name__ == "__main__":
    collection = get_collection()
    if collection:
        print(f"Indexed chunks: {collection.count()}")
    else:
        print("ChromaDB not available.")
    