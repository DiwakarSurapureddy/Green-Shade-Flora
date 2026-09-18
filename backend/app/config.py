import os
from pathlib import Path
from dotenv import load_dotenv

# Base backend directory
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

# App configs
APP_NAME = os.getenv("APP_NAME", "Green Shade Nursery API")
DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes")
HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", "8000"))

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./db/gs_nursery.db")
# Render / Heroku compatibility: SQLAlchemy requires postgresql:// instead of postgres://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Frontend directory
FRONTEND_DIR = BASE_DIR.parent / "FRONTEND"

# Uploads directory
UPLOADS_DIR = BASE_DIR / "uploads"
GALLERY_UPLOADS_DIR = UPLOADS_DIR / "gallery"
GALLERY_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# DB folder for SQLite if used
DB_DIR = BASE_DIR / "db"
DB_DIR.mkdir(parents=True, exist_ok=True)

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "greenshade_nursery_secret_key_2026_super_secure")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

# Admin Defaults
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "nursery@123")
