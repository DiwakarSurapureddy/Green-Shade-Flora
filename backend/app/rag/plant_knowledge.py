import json
import re
import csv
from pathlib import Path
from typing import Any, Optional
from difflib import SequenceMatcher

BACKEND_DIR = Path(__file__).resolve().parents[2]
KB_JSON_FILE = BACKEND_DIR / "knowledge" / "plant_database.json"
CHUNKS_FILE = BACKEND_DIR / "knowledge" / "chunks.xlsx"

_PLANTS_DB: list[dict[str, Any]] = []
_ALL_CHUNKS: list[dict[str, Any]] = []


def _clean_text(text: str) -> str:
    return re.sub(r"[^\w\s]", " ", text.lower()).strip()


def load_database() -> list[dict[str, Any]]:
    global _PLANTS_DB
    if _PLANTS_DB:
        return _PLANTS_DB

    if KB_JSON_FILE.exists():
        try:
            with open(KB_JSON_FILE, "r", encoding="utf-8") as f:
                _PLANTS_DB = json.load(f)
                return _PLANTS_DB
        except Exception as e:
            print(f"Error loading plant_database.json: {e}")

    return []


def load_all_chunks() -> list[dict[str, Any]]:
    global _ALL_CHUNKS
    if _ALL_CHUNKS:
        return _ALL_CHUNKS

    # Try reading from chunks.xlsx as CSV or Excel
    chunks = []
    if CHUNKS_FILE.exists():
        try:
            with open(CHUNKS_FILE, "r", encoding="utf-8", errors="ignore") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    cid = row.get("id", "")
                    text = row.get("text", "").strip()
                    if text:
                        chunks.append({"id": cid, "text": text})
        except Exception as e:
            print(f"Error loading chunks.xlsx: {e}")

    # If chunks is empty or small, create chunks from _PLANTS_DB
    if not chunks:
        plants = load_database()
        for idx, p in enumerate(plants):
            text = (
                f"Plant Name: {p.get('name')}\n"
                f"Botanical Name: {p.get('botanical_name')}\n"
                f"Category: {p.get('category')}\n"
                f"Aliases: {p.get('aliases')}\n"
                f"Sunlight: {p.get('sunlight')}\n"
                f"Watering: {p.get('watering')}\n"
                f"Soil: {p.get('soil')}\n"
                f"Fertilizer: {p.get('fertilizer')}\n"
                f"Highlights: {p.get('highlights')}\n"
                f"Pest and Care: {p.get('care_pest')}\n"
                f"Availability: {p.get('nursery_availability')}"
            )
            chunks.append({"id": str(idx), "text": text})

    _ALL_CHUNKS = chunks
    return _ALL_CHUNKS


def _score_plant_match(query: str, plant: dict[str, Any]) -> float:
    q_clean = _clean_text(query)
    q_words = set(q_clean.split())
    # remove generic stop words
    stop_words = {
        "plant", "plants", "tree", "trees", "flower", "flowers", "fruit", "fruits",
        "bonsai", "care", "how", "to", "grow", "water", "watering", "the", "a", "an",
        "tell", "me", "about", "what", "is", "in", "for", "give", "list", "show", "of", "all"
    }
    meaningful_words = q_words - stop_words
    if not meaningful_words:
        # Query consists only of generic words (e.g. "how to water plants") -> not a specific plant name
        return 0.0

    name = plant.get("name", "").lower()
    botanical = plant.get("botanical_name", "").lower()
    aliases = plant.get("aliases", "").lower()
    category = plant.get("category", "").lower()

    # Exact match on plant name
    if q_clean == name or name in q_clean:
        return 100.0

    # Match in aliases
    alias_list = [a.strip() for a in aliases.split(",") if a.strip()]
    for alias in alias_list:
        if alias in q_clean or q_clean in alias:
            return 95.0

    # Substring in botanical name
    if q_clean in botanical or botanical in q_clean:
        return 90.0

    score = 0.0
    # Check meaningful word matches in name
    name_words = set(_clean_text(name).split())
    matched_name = meaningful_words.intersection(name_words)
    if matched_name:
        score += len(matched_name) * 40.0

    # Check meaningful word matches in aliases
    alias_words = set(_clean_text(aliases).split())
    matched_alias = meaningful_words.intersection(alias_words)
    if matched_alias:
        score += len(matched_alias) * 30.0

    # Check meaningful word matches in botanical
    bot_words = set(_clean_text(botanical).split())
    matched_bot = meaningful_words.intersection(bot_words)
    if matched_bot:
        score += len(matched_bot) * 20.0

    # String similarity ratio with plant name
    ratio = SequenceMatcher(None, q_clean, name).ratio()
    if ratio > 0.7:
        score += ratio * 50.0

    return score


def get_general_care_guide(query: str) -> Optional[str]:
    """Provide professional nursery advice for general plant care queries."""
    q = query.lower()
    
    if any(w in q for w in ["water", "watering"]):
        return (
            "### 💧 Green Shade Nursery Watering Master Guide\n\n"
            "Proper watering is the #1 secret to thriving plants. Here are our nursery-proven guidelines:\n\n"
            "- **The 2-Inch Finger Test:** Insert your index finger 1-2 inches into the soil. If it feels completely dry, water thoroughly until it drains from the bottom. If damp, wait.\n"
            "- **Morning Watering Rule:** Always water early in the morning (6:00 AM - 9:00 AM) so leaves dry quickly and prevent fungal spores.\n"
            "- **Seasonal Schedules:**\n"
            "  • *Summer:* Outdoor flowers & fruits need daily watering; indoor plants every 2-3 days.\n"
            "  • *Monsoon:* Reduce watering significantly. Ensure drainage holes are unblocked.\n"
            "  • *Winter:* Water only when top 2 inches dry out (usually every 3-5 days).\n"
            "- **Avoid Wetting Leaves:** Direct water at the root zone/soil base, not over blooms or foliage to prevent powdery mildew and black spots.\n\n"
            "💡 *Tip: Ask me about any specific plant (e.g. \"rose\", \"mango\", \"ficus bonsai\") for custom watering requirements!*"
        )
    
    if any(w in q for w in ["fertilizer", "fertiliser", "feed", "nutrition", "manure"]):
        return (
            "### 🌱 Green Shade Nursery Fertilization Master Guide\n\n"
            "For vibrant blooms, vigorous roots, and healthy fruits:\n\n"
            "- **Base Soil Nutrition:** Mix well-decomposed cow dung manure (Gobar Khad) or vermicompost (20-30%) into potting soil.\n"
            "- **Flowering Plants (Roses, Hibiscus, Jasmines):** Feed mustard cake liquid tea (Sarson Khali) once every 15 days or NPK 19-19-19 during blooming seasons.\n"
            "- **Foliage & Indoor Plants:** Apply balanced half-strength liquid fertilizer once a month during spring and summer; withhold during winter dormancy.\n"
            "- **Fruit Trees (Mango, Guava, Sapota):** Apply organic compost + bone meal twice a year (June-July pre-monsoon and December-January pre-flowering).\n"
            "- **Bonsai:** Use slow-release organic pellets or dilute seaweed extract monthly.\n\n"
            "💡 *Tip: Always water the soil before adding fertilizer to avoid root burn!*"
        )

    if any(w in q for w in ["soil", "potting", "mix", "media"]):
        return (
            "### 🪴 Green Shade Nursery Potting Soil Formula\n\n"
            "For Indian tropical climate, we recommend our proven nursery soil blend:\n\n"
            "- **General Flowering & Ornamental Plants:**\n"
            "  • 40% Rich garden red/loamy soil\n"
            "  • 30% Organic vermicompost or aged cow manure\n"
            "  • 20% Washed Cocopeat (for moisture retention)\n"
            "  • 10% River sand or perlite (for sharp drainage)\n"
            "- **Bonsai Soil Mix:** 50% coarse river grit / pumice + 30% akadama / brick chips + 20% organic leaf mold.\n"
            "- **Succulents & Adeniums:** 60% gravel/pumice + 20% sand + 20% soil.\n\n"
            "📍 *All specialized potting soils and enriched media are available at Green Shade Nursery in Kadiyapu Savaram.*"
        )

    if any(w in q for w in ["pest", "pests", "insect", "disease", "fungus", "bugs"]):
        return (
            "### 🛡️ Organic Pest & Disease Management Guide\n\n"
            "Keep your garden pest-free naturally:\n\n"
            "- **Neem Oil Spray (Preventive & Cure):** Mix 5 ml pure cold-pressed Neem Oil + 2 ml organic liquid dish soap in 1 liter of water. Spray thoroughly under leaves every 10-14 days in late evening.\n"
            "- **Common Garden Pests:**\n"
            "  • *Aphids & Whiteflies:* Spray with water jet, then apply neem oil spray.\n"
            "  • *Mealybugs:* Dab directly with a cotton swab soaked in 70% rubbing alcohol, or spray soap-neem emulsion.\n"
            "  • *Fungal leaf spots:* Prune infected leaves immediately; spray copper oxychloride or systemic fungicide during rainy season.\n\n"
            "🌿 *For persistent garden issues, our nursery agronomists at Kadiyapu Savaram provide personalized garden assistance.*"
        )

    return None



def search_plants(query: str, top_k: int = 5) -> list[dict[str, Any]]:
    plants = load_database()
    if not plants:
        return []

    scored_plants = []
    for plant in plants:
        score = _score_plant_match(query, plant)
        if score > 15.0:
            scored_plants.append((score, plant))

    scored_plants.sort(key=lambda x: x[0], reverse=True)
    return [p for _, p in scored_plants[:top_k]]


def format_plant_response(plant: dict[str, Any]) -> str:
    name = plant.get("name", "Unknown Plant")
    botanical = plant.get("botanical_name", "")
    category = plant.get("category", "Nursery Plant")
    aliases = plant.get("aliases", "")
    sunlight = plant.get("sunlight", "Adequate direct/indirect sunlight")
    watering = plant.get("watering", "Water when topsoil feels dry")
    soil = plant.get("soil", "Well-draining fertile soil")
    fertilizer = plant.get("fertilizer", "Apply organic fertilizer during active growth")
    highlights = plant.get("highlights", "")
    care_pest = plant.get("care_pest", "")
    availability = plant.get("nursery_availability", "Available at Green Shade Nursery, Kadiyapu Savaram")

    response_lines = [
        f"### 🌿 {name} ({category})",
        f"**Scientific Name:** *{botanical}*" + (f" | **Local / Common Aliases:** {aliases}" if aliases else ""),
        "",
        f"☀️ **Sunlight:** {sunlight}",
        f"💧 **Watering:** {watering}",
        f"🌱 **Soil & Potting:** {soil}",
        f"🧪 **Fertilizer & Nutrition:** {fertilizer}",
    ]

    if highlights:
        response_lines.append(f"✨ **Seasonal Care & Highlights:** {highlights}")
    if care_pest:
        response_lines.append(f"🛡️ **Pruning & Pest Management:** {care_pest}")

    response_lines.append("")
    response_lines.append(f"🏡 **Green Shade Nursery Availability:** {availability}")
    response_lines.append("📍 *Visit our nursery at Main Road, Kadiyapu Savaram, Kadiyam Mandal, Andhra Pradesh or call +91 9666004249 for sapling orders.*")

    return "\n".join(response_lines)


def format_category_overview(category_name: str) -> str:
    plants = load_database()
    cat_clean = category_name.lower()
    matched = [p for p in plants if cat_clean in p.get("category", "").lower()]
    if not matched:
        return ""

    sample_names = [p.get("name") for p in matched[:15]]
    return (
        f"### 🌿 Green Shade Nursery - {matched[0].get('category')} Collection\n\n"
        f"We cultivate over **50+ acclimatized varieties** in this category at our 29-year-old nursery in Kadiyapu Savaram!\n\n"
        f"**Popular varieties include:**\n"
        f"- " + "\n- ".join(sample_names) + f"\n...and many more!\n\n"
        f"Ask me about any specific variety (e.g. *\"{sample_names[0]}\"* or *\"{sample_names[1]}\"*) for full watering, sunlight, soil, and fertilizing care instructions!"
    )


def search_knowledge_chunks(query: str, top_k: int = 5) -> list[dict[str, Any]]:
    """Fast lexical and semantic-overlap chunk retrieval across all 555+ chunks."""
    all_chunks = load_all_chunks()
    if not all_chunks:
        return []

    q_clean = _clean_text(query)
    q_terms = set(q_clean.split())
    # remove ultra-generic words
    stop = {"the", "a", "an", "is", "in", "of", "and", "or", "to", "for", "with", "on", "at", "by", "from"}
    meaningful = q_terms - stop
    if not meaningful:
        meaningful = q_terms

    scored_chunks = []
    for chunk in all_chunks:
        text = chunk.get("text", "")
        text_lower = text.lower()
        chunk_words = set(_clean_text(text).split())

        # Direct phrase hit
        score = 0.0
        if q_clean in text_lower:
            score += 50.0

        # Term overlap
        overlap = meaningful.intersection(chunk_words)
        if overlap:
            score += len(overlap) * 10.0
            # Boost if plant name line matches
            first_line = text_lower.split("\n")[0] if "\n" in text_lower else text_lower
            if any(term in first_line for term in overlap):
                score += 25.0

        if score > 0:
            # Map score to pseudo-distance for compatibility with ChromaDB
            dist = 1.0 / (1.0 + score)
            scored_chunks.append({
                "text": text,
                "metadata": {"source": "Green Shade Flora Knowledge Base", "id": chunk.get("id")},
                "distance": dist,
                "_score": score
            })

    scored_chunks.sort(key=lambda x: x["_score"], reverse=True)
    return scored_chunks[:top_k]
