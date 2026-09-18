import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server dir or root dir
dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "green_shade_flora_secret_key_2026";
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.warn("WARNING: GROQ_API_KEY not found in environment variables.");
}

const groq = new Groq({ apiKey: GROQ_API_KEY || "dummy_key" });

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Paths for JSON storage
const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const STORE_PATH = path.join(DATA_DIR, "store.json");
const USERS_PATH = path.join(DATA_DIR, "users.json");

// Helper for chat history
function loadChatHistory() {
  if (!fs.existsSync(STORE_PATH)) return {};
  try {
    const data = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(data) || {};
  } catch {
    return {};
  }
}

function saveChatHistory(history) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(history, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save chat history:", err);
  }
}

let CHAT_HISTORY = loadChatHistory();

// Helper for users
function loadUsers() {
  if (!fs.existsSync(USERS_PATH)) {
    const defaultAdminPassword = bcrypt.hashSync("plant123", 10);
    const initialUsers = [
      {
        id: "usr_demo_1",
        name: "Flora Explorer",
        email: "demo@greenshade.com",
        password: defaultAdminPassword,
        avatar: "🌿",
        role: "Gardener",
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(USERS_PATH, JSON.stringify(initialUsers, null, 2), "utf-8");
    return initialUsers;
  }
  try {
    return JSON.parse(fs.readFileSync(USERS_PATH, "utf-8")) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save users:", err);
  }
}

let USERS = loadUsers();

// Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

// -----------------------------
// Routes: Health
// -----------------------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "Green Shade Flora Node.js API",
    groqConfigured: Boolean(GROQ_API_KEY),
    time: new Date().toISOString()
  });
});

// -----------------------------
// Routes: Auth
// -----------------------------
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = USERS.find((u) => u.email === normalizedEmail);
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: "usr_" + uuidv4().slice(0, 8),
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      avatar: ["🌿", "🌸", "🌵", "🪴", "🍃"][Math.floor(Math.random() * 5)],
      role: role || "Plant Enthusiast",
      createdAt: new Date().toISOString()
    };

    USERS.push(newUser);
    saveUsers(USERS);

    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Registration failed", details: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = USERS.find((u) => u.email === normalizedEmail);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, avatar: user.avatar, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed", details: error.message });
  }
});

app.get("/api/auth/me", authenticateToken, (req, res) => {
  const user = USERS.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role
    }
  });
});

// -----------------------------
// Routes: Plant Suggestions
// -----------------------------
app.get("/api/suggest", (req, res) => {
  const problems = [
    "How do I care for a money plant?",
    "Why are my rose leaves turning yellow?",
    "Best indoor plants for low light conditions?",
    "How often should I water a cactus?",
    "What is the process of photosynthesis?",
    "How to grow tomatoes at home?",
    "How do I get rid of aphids on my plants?",
    "What are the best plants to purify indoor air?",
    "How to make compost at home for my garden?",
    "What soil type is best for succulents?",
    "How do I revive a drooping Snake Plant?",
    "Which herbs can be grown in a small kitchen windowsill?"
  ];

  const suggestion = problems[Math.floor(Math.random() * problems.length)];
  res.json({ suggestion });
});

// -----------------------------
// Routes: AI Chat
// -----------------------------
app.post("/api/chat", async (req, res) => {
  const { message, sessionId = "default_session", context } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  let sid = sessionId;
  if (!CHAT_HISTORY[sid]) {
    CHAT_HISTORY[sid] = [];
  }

  try {
    let contextNote = "";
    if (context && context.visiblePlants) {
      contextNote = ` Currently visible recommended plants in catalog: ${context.visiblePlants.join(", ")}.`;
    }

    const systemPrompt =
      "You are PlantMate AI, an expert, enthusiastic, and friendly botanical assistant for Green Shade Flora. " +
      "You guide users on all plant-related topics including indoor & outdoor gardening, plant care, watering regimens, " +
      "sunlight needs, soil blends, pest control, plant propagation, and eco-friendly nature topics. " +
      "Provide visually clear, concise, structured answers with bullet points and emojis where helpful." +
      contextNote +
      " If the query is completely unrelated to plants, nature, botany, or ecology, politely decline and steer them back to plant topics.";

    // Build chat completion messages
    const messages = [
      { role: "system", content: systemPrompt },
      ...CHAT_HISTORY[sid].slice(-4).flatMap((item) => [
        { role: "user", content: item.user },
        { role: "assistant", content: item.bot }
      ]),
      { role: "user", content: message }
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 1024
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() ||
      "I'm here to assist with all your plant queries! Could you clarify which plant you'd like advice on?";

    CHAT_HISTORY[sid].push({
      user: message,
      bot: reply,
      timestamp: new Date().toISOString()
    });

    saveChatHistory(CHAT_HISTORY);

    res.json({
      reply,
      history: CHAT_HISTORY[sid]
    });
  } catch (error) {
    console.error("Groq AI Chat error:", error);
    res.status(500).json({
      error: "Failed to generate AI response",
      details: error.message || "Unknown error"
    });
  }
});

// -----------------------------
// Routes: Chat History
// -----------------------------
app.get("/api/history", (req, res) => {
  const sid = req.query.sessionId || "default_session";
  const sessionHistory = CHAT_HISTORY[sid] || [];

  const messages = [];
  sessionHistory.forEach((item) => {
    if (item.user) messages.push({ role: "user", text: item.user });
    if (item.bot) messages.push({ role: "bot", text: item.bot });
  });

  res.json({ messages });
});

app.post("/api/delete-history", (req, res) => {
  const { sessionId = "default_session" } = req.body || {};
  if (CHAT_HISTORY[sessionId]) {
    CHAT_HISTORY[sessionId] = [];
    saveChatHistory(CHAT_HISTORY);
  }
  res.json({ message: "History cleared successfully" });
});

// -----------------------------
// Serve Built React Frontend (Production)
// -----------------------------
const FRONTEND_DIST = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST));
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(FRONTEND_DIST, "index.html"));
    }
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`🌿 Green Shade Flora Server running on http://localhost:${PORT}`);
});

