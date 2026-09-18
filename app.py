from datetime import datetime
import os
import uuid
from collections import defaultdict
from flask import Flask, request, jsonify, session, render_template, send_from_directory
from groq import Groq
from dotenv import load_dotenv
import json


try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass


API_KEY = os.getenv("GROQ_API_KEY")
if not API_KEY:
    raise RuntimeError("GROQ_API_KEY is required in .env")

client = Groq(api_key=API_KEY)


# -----------------------------
# Flask Setup
# -----------------------------
app = Flask(__name__, static_folder="frontend", static_url_path="")
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# -----------------------------
# Chat History
# -----------------------------
HISTORY_PATH = os.path.join(os.path.dirname(__file__), "store.json")


def _load_history():
    """Load chat history from file"""
    if not os.path.exists(HISTORY_PATH):
        return defaultdict(list)
    try:
        with open(HISTORY_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, dict):
                return defaultdict(list, {k: v for k, v in data.items()})
            return defaultdict(list)
    except Exception:
        return defaultdict(list)


def _save_all_history():
    """Save current chat history to file"""
    history_dict = {}
    for sid, messages in CHAT_HISTORY.items():
        history_dict[sid] = messages

    with open(HISTORY_PATH, "w", encoding="utf-8") as f:
        json.dump(history_dict, f, ensure_ascii=True, indent=2)


def _timestamp():
    return datetime.now().strftime("%Y-%m-%d %H:%M")


CHAT_HISTORY = _load_history()

# -----------------------------
# Routes
# -----------------------------

@app.route("/")
def home():
    return send_from_directory(app.static_folder, "index.html")

# -----------------------------
# Chat API
# -----------------------------

@app.route("/chat", methods=["POST"])
def chat():

    data = request.json
    message = data.get("message")

    if not message:
        return jsonify({"error": "Message empty"})

    if "sid" not in session:
        session["sid"] = str(uuid.uuid4())

    sid = session["sid"]

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are PlantMate AI, a friendly and knowledgeable plant and nature assistant. "
                        "You help users with all plant-related topics including plant care, watering schedules, "
                        "sunlight requirements, soil types, fertilizers, plant identification, pest and disease control, "
                        "indoor and outdoor gardening, hydroponics, environmental topics, ecosystems, and nature-related questions. "
                        "Always provide clear, detailed, and helpful answers. "
                        "If the query is not related to plants, nature, or the environment, "
                        "politely decline and ask the user to ask a plant or nature-related question."
                    )
                },
                {"role": "user", "content": message}
            ],
            temperature=0.7,
            max_tokens=1024
        )

        reply = response.choices[0].message.content.strip() if response.choices else ""

        if not reply:
            reply = "I'm sorry, I couldn't generate a response. Please try rephrasing your plant or nature question."

        CHAT_HISTORY[sid].append({
            "user": message,
            "bot": reply
        })

        # Save history to file
        _save_all_history()

        return jsonify({
            "reply": reply,
            "history": CHAT_HISTORY[sid]
        })

    except Exception as e:
        import traceback

        traceback.print_exc()
        error_msg = str(e) if str(e) else "Unknown error"

        return jsonify({
            "error": "Failed to generate response",
            "details": error_msg
        }), 500


# -----------------------------
# Get History
# -----------------------------

@app.route("/history")
def history():

    sid = session.get("sid")

    if not sid:
        return jsonify({"messages": []})

    messages = []
    for item in CHAT_HISTORY[sid]:
        if "user" in item:
            messages.append({"role": "user", "text": item["user"]})
        if "bot" in item:
            messages.append({"role": "bot", "text": item["bot"]})

    return jsonify({"messages": messages})


# -----------------------------
# Delete History
# -----------------------------

@app.route("/delete-history", methods=["POST"])
def delete_history():

    sid = session.get("sid")

    if sid and sid in CHAT_HISTORY:
        CHAT_HISTORY[sid] = []

    # Save updated history to file
    _save_all_history()

    return jsonify({
        "message": "History Cleared"
    })


# -----------------------------
# Suggest Plant Questions
# -----------------------------

@app.route("/suggest")
def suggest():

    import random

    problems = [
        "How do I care for a money plant?",
        "Why are my rose leaves turning yellow?",
        "Best indoor plants for low light conditions?",
        "How often should I water a cactus?",
        "What is the process of photosynthesis?",
        "How to grow tomatoes at home?",
        "How do I get rid of aphids on my plants?",
        "What are the best plants to purify indoor air?",
        "How to make compost at home for my garden?",
        "What soil type is best for succulents?"
    ]

    return jsonify({
        "suggestion": random.choice(problems)
    })


# -----------------------------
# Run Server
# -----------------------------

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)