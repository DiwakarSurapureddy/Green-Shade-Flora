from functools import lru_cache
from typing import Any

from app.rag.embedder import get_collection


@lru_cache(maxsize=1)
def get_knowledge_collection() -> Any:
	try:
		return get_collection()
	except Exception:
		return None


def retrieve_chunks(query: str, top_k: int = 5) -> list[dict[str, Any]]:
	"""Return the most relevant knowledge chunks for a user query."""
	collection = get_knowledge_collection()
	if collection is None:
		return []

	try:
		result = collection.query(
			query_texts=[query.strip()],
			n_results=min(max(top_k, 1), 5),
			include=["documents", "metadatas", "distances"],
		)

		documents = result.get("documents", [[]])[0]
		metadatas = result.get("metadatas", [[]])[0]
		distances = result.get("distances", [[]])[0]
		return [
			{
				"text": document,
				"metadata": metadata or {},
				"distance": distance,
			}
			for document, metadata, distance in zip(documents, metadatas, distances)
		]
	except Exception:
		return []

