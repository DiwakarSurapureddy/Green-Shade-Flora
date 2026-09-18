# 🌿 Green Shade Flora — Full-Stack Node.js + React Botanical Platform

A premier, full-stack botanical education and AI-guided plant care application built with **Node.js (Express)**, **React (Vite)**, **Groq AI (Llama-3.3-70b)**, and modern glassmorphic styling.

---

## ✨ Features

- 🌿 **Premier Modern Aesthetics**: Tailored botanical color tokens, glassmorphism, Google Fonts (*Outfit* & *Plus Jakarta Sans*), micro-interactions, and responsive layout for mobile and desktop.
- 🔐 **Authentication System**:
  - Full **Log In** & **Sign Up** accessible right from the navigation bar.
  - JWT token and password encryption with `bcryptjs`.
  - User avatar and status in the navigation bar with one-click logout.
  - Quick **Demo Account** one-click login button for instant access (`demo@greenshade.com` / `plant123`).
- 🤖 **Groq PlantMate AI Assistant**:
  - Powered by Groq's high-speed `llama-3.3-70b-versatile` model.
  - Available as an embedded consultation assistant and a floating interactive drawer widget.
  - Chat history persistence and suggested prompt chips.
- 📚 **Comprehensive Botanical Catalog**:
  - **Plant Types Page**: 6 interactive families (Indoor, Outdoor, Medicinal, Flowering, Succulents, Air Purifiers).
  - **Smart Search & Filter**: Real-time fuzzy search by name, light, space, and care difficulty.
  - **Plant Care Manual**: In-depth care protocols for Tulsi, Snake Plant, Aloe Vera, plus an interactive symptom troubleshooter.
  - **Indoor vs Outdoor**: Full side-by-side comparison matrix and decision guide.

---

## 📁 Project Architecture

```
Green Shade Flora/
├── server/                    # Node.js + Express Backend
│   ├── server.js              # Express API (Groq AI chat, Auth, Chat history, Static React serve)
│   ├── package.json           # Dependencies: express, groq-sdk, jsonwebtoken, bcryptjs, cors, dotenv
│   └── data/
│       ├── users.json         # Local user account storage
│       └── store.json         # Chat session histories
├── frontend/                  # React + Vite Client
│   ├── src/
│   │   ├── components/        # Navbar, Footer, PlantCard, ChatBot
│   │   ├── context/           # AuthContext.jsx (global authentication state)
│   │   ├── pages/             # Home, PlantTypes, SearchPlants, PlantCare, IndoorOutdoor, Login, Signup
│   │   ├── data/              # plantsData.js (botanical catalog & comparison data)
│   │   ├── styles/            # index.css (design tokens, glassmorphism, responsive styles)
│   │   ├── App.jsx            # Routing and application layout
│   │   └── main.jsx           # React DOM root
│   ├── index.html
│   ├── vite.config.js         # Vite configuration with API proxy to port 5000
│   └── package.json           # Dependencies: react, react-dom, lucide-react, vite
├── legacy_backup/             # Preserved backup of original HTML/CSS files
├── package.json               # Root scripts to run backend and frontend
├── .env                       # GROQ_API_KEY, JWT_SECRET, PORT
└── README.md
```

---

## 🚀 How to Run

### 1. Prerequisites
- **Node.js** (v18 or newer)
- Existing `.env` file containing your `GROQ_API_KEY`

### 2. Quick Start (Development Mode)

From the project root directory:

**Terminal 1 — Start Node.js Backend API:**
```bash
npm run server
# Or: cd server && npm start
```
*Server runs at `http://localhost:5000`.*

**Terminal 2 — Start React Frontend (with Hot Reload):**
```bash
npm run frontend
# Or: cd frontend && npm run dev
```
*Frontend opens at `http://localhost:5173`.*

---

### 3. Single-Server Production Mode

You can also run both the backend API and the compiled React frontend from a single Node.js command:

```bash
# Build React application
npm run build

# Start the Node.js server (serves both React and API endpoints)
npm run server
```
*Visit `http://localhost:5000` in your browser.*

---

## 🔑 Demo Account Credentials

To quickly test authenticated features without registering a new email:
- **Email**: `demo@greenshade.com`
- **Password**: `plant123`
*(Or click the "One-Click Login" button directly on the Login page).*
