import os
from functools import lru_cache

from app.rag.retriever import retrieve_chunks

UNAVAILABLE_RESPONSE = "Sorry, I couldn't find this information in the Green Shade Flora knowledge base."
UNSUPPORTED_RESPONSE = "I am Plant Care AI. I can answer only Green Shade Flora plant and nursery related questions."

SUPPORTED_TERMS = {
	"plant", "plants", "care", "water", "watering", "sunlight", "light", "temperature",
	"humidity", "soil", "fertilizer", "category", "indoor", "outdoor", "medicinal",
	"flower", "air purifying", "description", "benefit", "maintenance", "availability",
	"nursery", "garden", "gardening", "dracaena", "palm", "anthurium", "snake",
}


def _is_supported_question(message: str) -> bool:
	normalized = message.lower()
	return any(term in normalized for term in SUPPORTED_TERMS)


def _context_text(chunks: list[dict]) -> str:
	return "\n\n".join(
		f"Source chunk {index}: {chunk['text']}"
		for index, chunk in enumerate(chunks, start=1)
	)


@lru_cache(maxsize=128)
def answer_question(message: str) -> str:
	question = message.strip()
	if not _is_supported_question(question):
		return UNSUPPORTED_RESPONSE

	chunks = retrieve_chunks(question, top_k=5)
	if not chunks:
		return UNAVAILABLE_RESPONSE

	context = _context_text(chunks)
	api_key = os.getenv("GEMINI_API_KEY")
	if not api_key:
		return _grounded_fallback(question, chunks)

	try:
		from google import genai

		prompt = (
			"You are Plant Care AI for Green Shade Flora. Answer the user's question using "
			"only the source chunks below. Do not use prior knowledge, infer missing care "
			"instructions, mention sources, or invent availability. If the chunks do not "
			f"contain the answer, reply exactly: {UNAVAILABLE_RESPONSE}\n\n"
			f"Source chunks:\n{context}\n\nUser question: {question}"
		)
		with genai.Client(api_key=api_key) as client:
			response = client.models.generate_content(
				model=os.getenv("GEMINI_MODEL", "gemini-3.6-flash"),
				contents=prompt,
			)
		answer = (response.text or "").strip()
		return answer or UNAVAILABLE_RESPONSE
	except Exception:
		return _grounded_fallback(question, chunks)


def _grounded_fallback(question: str, chunks: list[dict]) -> str:
	"""Provide a useful answer without making up facts when Gemini is unavailable."""
	requested_terms = {
		term for term in (
			"water", "watering", "sunlight", "light", "temperature", "humidity",
			"soil", "fertilizer", "fertiliser", "care", "maintenance", "benefit",
			"availability", "available",
		)
		if term in question.lower()
	}
	context = " ".join(chunk["text"].lower() for chunk in chunks)
	if requested_terms and not any(term in context for term in requested_terms):
		return UNAVAILABLE_RESPONSE

	query_terms = {term for term in question.lower().split() if len(term) > 2}
	matching_chunks = [
		chunk for chunk in chunks
		if query_terms.intersection(set(chunk["text"].lower().split()))
	]
	if not matching_chunks:
		return UNAVAILABLE_RESPONSE
	return matching_chunks[0]["text"]
