import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import DATABASE_URL, DB_DIR

connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False

try:
    engine = create_engine(DATABASE_URL, connect_args=connect_args)
    # Quick probe
    with engine.connect() as conn:
        pass
    print(f">> Connected to Database: {DATABASE_URL.split('@')[-1] if '@' in DATABASE_URL else DATABASE_URL}")
except Exception as e:
    print(f">> Notice: Could not connect to primary DATABASE_URL ({e}).")
    fallback_url = f"sqlite:///{DB_DIR / 'gs_nursery.db'}"
    print(f">> Switching to local resilient database: {fallback_url}")
    engine = create_engine(fallback_url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Dependency provider for database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
