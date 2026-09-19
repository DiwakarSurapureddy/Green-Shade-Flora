import os
from functools import lru_cache

from app.rag.retriever import retrieve_chunks
from app.rag.plant_knowledge import (
	search_plants,
	format_plant_response,
	format_category_overview,
	get_general_care_guide,
	load_database,
)

UNAVAILABLE_RESPONSE = "Sorry, I couldn't find this information in the Green Shade Flora knowledge base. You can ask about any of our 200+ varieties of flowers, fruits, bonsai, and nursery plants!"
UNSUPPORTED_RESPONSE = "I am Plant Care AI for Green Shade Nursery. I can answer questions about plants, flowers, fruits, bonsai, nursery varieties, gardening care, watering, sunlight, soil, fertilizers, and plant availability."

SUPPORTED_KEYWORDS = {
	"plant", "plants", "care", "water", "watering", "sunlight", "light", "temperature",
	"humidity", "soil", "fertilizer", "fertiliser", "category", "indoor", "outdoor", "medicinal",
	"flower", "flowers", "fruit", "fruits", "bonsai", "nursery", "tree", "trees", "leaf",
	"leaves", "root", "roots", "prune", "pruning", "pest", "pests", "insect", "disease",
	"air purifying", "description", "benefit", "maintenance", "availability",
	"garden", "gardening", "dracaena", "palm", "anthurium", "snake", "rose", "gulab",
	"hibiscus", "jasmine", "bougainvillea", "mango", "guava", "chikoo", "citrus", "lemon",
	"ficus", "jade", "banyan", "peepal", "adenium", "kadiyam", "green shade",
}


def _is_supported_question(message: str) -> bool:
	normalized = message.lower()
	if any(term in normalized for term in SUPPORTED_KEYWORDS):
		return True

	# Check if any plant name in our database matches
	plants = load_database()
	for p in plants:
		p_name = p.get("name", "").lower()
		if p_name and p_name in normalized:
			return True
		aliases = p.get("aliases", "").lower()
		if aliases:
			for alias in aliases.split(","):
				alias = alias.strip()
				if len(alias) > 3 and alias in normalized:
					return True

	return False


def _context_text(chunks: list[dict]) -> str:
	return "\n\n".join(
		f"Source chunk {index}:\n{chunk['text']}"
		for index, chunk in enumerate(chunks, start=1)
	)


@lru_cache(maxsize=128)
def answer_question(message: str) -> str:
	question = message.strip()
	if not _is_supported_question(question):
		return UNSUPPORTED_RESPONSE

	# 1. Direct plant check
	matched_plants = search_plants(question, top_k=1)
	if matched_plants:
		# If user asks directly about a recognized plant
		api_key = os.getenv("GEMINI_API_KEY")
		if not api_key:
			return format_plant_response(matched_plants[0])

	# 2. Category-level questions
	q_lower = question.lower()
	for cat in ["flower", "fruit", "bonsai", "nursery plant"]:
		if f"{cat} varieties" in q_lower or f"{cat} list" in q_lower or f"{cat}s list" in q_lower or f"all {cat}" in q_lower:
			cat_overview = format_category_overview(cat)
			if cat_overview:
				return cat_overview

	# 3. General nursery care guides (watering, soil, fertilizer, pest control)
	care_guide = get_general_care_guide(question)
	if care_guide and not matched_plants:
		return care_guide

	# 4. Retrieve relevant knowledge chunks
	chunks = retrieve_chunks(question, top_k=5)

	api_key = os.getenv("GEMINI_API_KEY")
	if not api_key:
		return _grounded_fallback(question, chunks, matched_plants)

	try:
		from google import genai

		context = _context_text(chunks)
		prompt = (
			"You are Plant Care AI for Green Shade Nursery, located at Main Road, Kadiyapu Savaram, "
			"Kadiyam Mandal, Andhra Pradesh (29+ years horticultural heritage, founder Surapureddy Rama Krishna). "
			"Answer the user's plant care, watering, sunlight, soil, fertilizer, or variety question "
			"warmly and professionally using the source chunks provided. "
			"Structure the answer with clear headings and bullet points where helpful. "
			"Mention that the plant or sapling is acclimatized and cultivated at Green Shade Nursery.\n\n"
			f"Source chunks:\n{context}\n\nUser question: {question}"
		)
		with genai.Client(api_key=api_key) as client:
			response = client.models.generate_content(
				model=os.getenv("GEMINI_MODEL", "gemini-2.5-flash"),
				contents=prompt,
			)
		answer = (response.text or "").strip()
		return answer or _grounded_fallback(question, chunks, matched_plants)
	except Exception:
		return _grounded_fallback(question, chunks, matched_plants)


def _grounded_fallback(question: str, chunks: list[dict], matched_plants: list[dict] = None) -> str:
	"""Provide a rich, accurate answer when Gemini is not configured or in offline mode."""
	if matched_plants:
		return format_plant_response(matched_plants[0])

	if chunks:
		# Check if the first chunk contains structured plant information
		first_chunk = chunks[0]["text"]
		if "Plant Name:" in first_chunk:
			# Convert key-value chunk to formatted markdown
			lines = first_chunk.strip().split("\n")
			data = {}
			for line in lines:
				if ":" in line:
					k, v = line.split(":", 1)
					data[k.strip().lower()] = v.strip()

			return format_plant_response({
				"name": data.get("plant name", "Plant"),
				"botanical_name": data.get("botanical name", ""),
				"category": data.get("category", "Nursery Plant"),
				"aliases": data.get("aliases", ""),
				"sunlight": data.get("sunlight", ""),
				"watering": data.get("watering", ""),
				"soil": data.get("soil", ""),
				"fertilizer": data.get("fertilizer", ""),
				"highlights": data.get("highlights", ""),
				"care_pest": data.get("pest and care", ""),
				"nursery_availability": data.get("availability", "Available at Green Shade Nursery"),
			})

		return first_chunk

	return UNAVAILABLE_RESPONSE

