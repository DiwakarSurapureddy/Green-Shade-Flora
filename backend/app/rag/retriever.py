from functools import lru_cache
from typing import Any

from app.rag.embedder import get_collection
from app.rag.plant_knowledge import search_knowledge_chunks, search_plants


@lru_cache(maxsize=1)
def get_knowledge_collection() -> Any:
	try:
		return get_collection()
	except Exception:
		return None


def retrieve_chunks(query: str, top_k: int = 5) -> list[dict[str, Any]]:
	"""Return the most relevant knowledge chunks for a user query."""
	cleaned_query = (query or "").strip()
	if not cleaned_query:
		return []

	chunks: list[dict[str, Any]] = []

	# 1. Try ChromaDB if available
	collection = get_knowledge_collection()
	if collection is not None:
		try:
			result = collection.query(
				query_texts=[cleaned_query],
				n_results=min(max(top_k, 1), 5),
				include=["documents", "metadatas", "distances"],
			)
			documents = result.get("documents", [[]])[0]
			metadatas = result.get("metadatas", [[]])[0]
			distances = result.get("distances", [[]])[0]
			chunks = [
				{
					"text": document,
					"metadata": metadata or {},
					"distance": distance,
				}
				for document, metadata, distance in zip(documents, metadatas, distances)
				if document
			]
		except Exception:
			chunks = []

	# 2. If ChromaDB returned no chunks or is unavailable, use our fast standalone engine
	if not chunks:
		# Check if direct plant match exists
		matching_plants = search_plants(cleaned_query, top_k=2)
		if matching_plants:
			for plant in matching_plants:
				plant_text = (
					f"Plant Name: {plant.get('name')}\n"
					f"Botanical Name: {plant.get('botanical_name')}\n"
					f"Category: {plant.get('category')}\n"
					f"Aliases: {plant.get('aliases')}\n"
					f"Sunlight: {plant.get('sunlight')}\n"
					f"Watering: {plant.get('watering')}\n"
					f"Soil: {plant.get('soil')}\n"
					f"Fertilizer: {plant.get('fertilizer')}\n"
					f"Highlights: {plant.get('highlights')}\n"
					f"Pest and Care: {plant.get('care_pest')}\n"
					f"Availability: {plant.get('nursery_availability')}"
				)
				chunks.append({
					"text": plant_text,
					"metadata": {"source": "Plant Database", "name": plant.get("name")},
					"distance": 0.05,
				})

		# Supplement with knowledge chunks
		extra_chunks = search_knowledge_chunks(cleaned_query, top_k=top_k)
		for ec in extra_chunks:
			if not any(c["text"] == ec["text"] for c in chunks):
				chunks.append(ec)

	return chunks[:top_k]


