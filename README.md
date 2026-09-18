# 🌿 Green Shade Nursery (Est. 1997) — Full-Stack Business Platform

> **Founder & Owner**: Surapureddy Rama Krishna  
> **Location**: Main Road Kadiyapu Savaram, Kadiyam Mandal, East Godavari District, Andhra Pradesh - 533126, India  
> **Heritage**: 29+ Years of Horticultural Heritage (Direct Nursery Grounds in India's Plant Nursery Capital)  
> **Primary / WhatsApp**: `+91 9666004249` | **Alternate**: `+91 8885322259`

---

## 🏛️ Business Overview & Identity

**Green Shade Nursery** is a high-volume, professional plant cultivation and nursery operation based in Kadiyapu Savaram, Andhra Pradesh. The platform is designed for real-world commercial trade, retail homeowners, landscape architects, B2B wholesale buyers, and government tender contracts.

### ✨ Key Capabilities
- **6 Core Horticultural Categories**:
  1. Ornamental Plants (Foliage, Hedge & Landscape)
  2. Mature Specimen Palms (Royal, Fox Tail, Areca, Date Palms)
  3. Flowering Shrubs (Tropical, Hibiscus, Bougainvillea, Jasmine)
  4. Exotic Indoor Greens (Air-purifiers, Philodendrons, Aglaonemas, Ficus)
  5. Handcrafted Bonsai (Specimen Ficus & Cascading Jade)
  6. Grafted Fruit Saplings (High-yield Mango, Guava, Citrus, Sapota)
- **Green Cart Inquiry System**: Eliminates generic consumer checkout; generates structured plant inquiry orders with wholesale/retail pricing requests routed directly to WhatsApp and synced to the database.
- **PostgreSQL Database + Realtime Nursery Desk**: Customer orders and plant inquiries are recorded in PostgreSQL (with automatic zero-config SQLite resilience fallback).
- **Interactive Nursery Desk**: Built-in admin panel to view, filter, and track customer inquiries in real-time.

---

## 🏗️ Architecture & Technology Stack

```
Green Shade Flora/
├── backend/                  # FastAPI + SQLAlchemy + PostgreSQL Backend
│   ├── app/
│   │   ├── models/           # SQLAlchemy DB Models (Plant, Order/Inquiry, User, Review)
│   │   ├── routes/           # REST APIs (/api/inquiries, /api/plants, /api/orders, /api/health)
│   │   ├── database.py       # PostgreSQL connection with SQLite automatic fallback
│   │   └── main.py           # FastAPI Application entry point
│   ├── run.py                # Server runner script (Port 8000)
│   ├── requirements.txt      # Python dependencies (FastAPI, uvicorn, SQLAlchemy, psycopg2)
│   └── .env                  # PostgreSQL DB connection string & secret keys
│
├── frontend/                 # React 18 + Vite Frontend
│   ├── src/
│   │   ├── components/       # Navbar, Footer, GreenCartDrawer, InquiryModal, AdminInquiryDrawer, PlantCard
│   │   ├── pages/            # Home, PlantsPage, About, Services, Contact
│   │   ├── context/          # GreenCartContext.jsx (Cart & Inquiry State)
│   │   ├── services/         # api.js (Frontend REST client for FastAPI & PostgreSQL)
│   │   ├── data/             # plantsData.js (Curated plant catalog & business profile)
│   │   └── styles/           # index.css (Comprehensive Green Shade Nursery styling)
│   ├── package.json          # React, Vite, Lucide-react
│   └── vite.config.js        # Port 5173 with proxy to Backend Port 8000
│
├── package.json              # Root unified run commands
└── README.md
```

---

## 🚀 How to Run the Project

### 1. Run the Backend (FastAPI + PostgreSQL / SQLite)
From the project root folder:
```powershell
python -m uvicorn backend.app.main:app --reload --port 8000
```
*Or using the backend runner:*
```powershell
python backend/run.py
```
- API Health: `http://127.0.0.1:8000/api/health`
- Swagger Interactive Docs: `http://127.0.0.1:8000/docs`
- Inquiries API: `http://127.0.0.1:8000/api/inquiries`

### 2. Run the Frontend (React + Vite)
In a separate terminal:
```powershell
npm --prefix frontend run dev
```
*Or from the root:*
```powershell
npm run dev
```
- Website URL: `http://localhost:5173/`

---

## 📋 Features in Detail

### 1. Direct WhatsApp Inquiry Quotation Generator
When visitors add plants to their **Green Cart** and click **"Generate WhatsApp Inquiry"**:
1. It asynchronously posts the inquiry to the **FastAPI + PostgreSQL** backend (`/api/inquiries`).
2. It launches an official WhatsApp message to **Surapureddy Rama Krishna** (`+91 9666004249`) with:
   - Order Code (e.g. `ORD-1789747718617`)
   - Customer Name, Phone, and Delivery Location
   - Requirement Type (Retail / B2B Wholesale / Landscaping / Tender)
   - Exact Plant Names and Quantities
   - Target Delivery Timeline & Notes

### 2. Nursery Desk (Admin Order Viewer)
Click **"📋 Nursery Desk"** in the top utility bar or footer to open the drawer:
- View all inquiries saved in PostgreSQL.
- Filter by status (`ALL`, `PENDING`, `CONFIRMED`, `COMPLETED`).
- Update inquiry status with one click (`Confirm`, `Mark Done`).

---

## 🌿 Business Contact Info
- **Founder & Owner**: Surapureddy Rama Krishna
- **Address**: Main Road Kadiyapu Savaram, Kadiyam Mandal, East Godavari District, Andhra Pradesh - 533126
- **WhatsApp / Primary**: +91 9666004249
- **Alternate Phone**: +91 8885322259
- **Working Hours**: Monday – Saturday: 7:00 AM – 8:00 PM | Sunday: 8:00 AM – 7:00 PM
