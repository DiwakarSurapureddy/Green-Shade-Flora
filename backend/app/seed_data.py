import json
import sys
from pathlib import Path
import hashlib

# Ensure UTF-8 output on Windows consoles
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from app.database import Base, engine, SessionLocal
from app.models.plant import Plant
from app.models.review import Review
from app.models.user import AdminUser
from app.models.gallery import GalleryItem
from app.models.order import Order
from app.config import ADMIN_USERNAME, ADMIN_PASSWORD
from sqlalchemy import text, inspect

def auto_migrate_schema():
    """Ensure all tables and their columns exist across SQLite and PostgreSQL."""
    try:
        # Register and create any non-existent tables
        Base.metadata.create_all(bind=engine)
        
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        if "gallery_items" in tables:
            cols = [c["name"].lower() for c in inspector.get_columns("gallery_items")]
            with engine.begin() as conn:
                if "desc" not in cols:
                    try:
                        conn.execute(text('ALTER TABLE gallery_items ADD COLUMN "desc" TEXT DEFAULT \'\''))
                        print("[MIGRATE] Added 'desc' column to gallery_items")
                    except Exception as e:
                        print(f"[MIGRATE WARN] desc col: {e}")
                if "file_name" not in cols:
                    try:
                        conn.execute(text('ALTER TABLE gallery_items ADD COLUMN file_name VARCHAR(255) DEFAULT \'\''))
                        print("[MIGRATE] Added 'file_name' column to gallery_items")
                    except Exception as e:
                        print(f"[MIGRATE WARN] file_name col: {e}")
                if "file_size" not in cols:
                    try:
                        conn.execute(text('ALTER TABLE gallery_items ADD COLUMN file_size INTEGER DEFAULT 0'))
                        print("[MIGRATE] Added 'file_size' column to gallery_items")
                    except Exception as e:
                        print(f"[MIGRATE WARN] file_size col: {e}")
                        
        if "orders" in tables:
            cols = [c["name"].lower() for c in inspector.get_columns("orders")]
            with engine.begin() as conn:
                if "order_type" not in cols:
                    try:
                        conn.execute(text('ALTER TABLE orders ADD COLUMN order_type VARCHAR(50) DEFAULT \'retail\''))
                    except Exception:
                        pass
                if "status" not in cols:
                    try:
                        conn.execute(text('ALTER TABLE orders ADD COLUMN status VARCHAR(50) DEFAULT \'pending\''))
                    except Exception:
                        pass
    except Exception as err:
        print(f"[WARN] Schema auto-migration check failed: {err}")

def seed_database():
    """Initializes tables, migrates columns, and seeds initial data from seed_data.json."""
    auto_migrate_schema()
    
    db = SessionLocal()
    try:
        # 1. Seed Admin User
        existing_admin = db.query(AdminUser).filter(AdminUser.username == ADMIN_USERNAME).first()
        if not existing_admin:
            hashed_pwd = hashlib.sha256(ADMIN_PASSWORD.encode()).hexdigest()
            admin = AdminUser(username=ADMIN_USERNAME, hashed_password=hashed_pwd, role="admin")
            db.add(admin)
            db.commit()
            print(f"[SUCCESS] Created default admin user: {ADMIN_USERNAME}")
            
        # 2. Seed Plants & Reviews from JSON
        json_file = Path(__file__).resolve().parent / "seed_data.json"
        if json_file.exists():
            with open(json_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            plants = data.get("plants", [])
            reviews = data.get("reviews", [])
            
            # Seed Plants
            plants_added = 0
            for p in plants:
                plant_id = str(p.get("id"))
                existing = db.query(Plant).filter(Plant.id == plant_id).first()
                if not existing:
                    plant_obj = Plant(
                        id=plant_id,
                        name=p.get("name", plant_id),
                        cat=p.get("cat", "Indoor"),
                        emoji=p.get("emoji", "🌿"),
                        price=float(p.get("price", 0)),
                        bulk=float(p.get("bulk", 0)),
                        rating=float(p.get("rating", 5.0)),
                        reviews=int(p.get("reviews", 0)),
                        image=p.get("image", ""),
                        desc=p.get("desc", ""),
                        care=p.get("care", {}),
                        stock=bool(p.get("stock", True)),
                        trending=bool(p.get("trending", False)),
                        badge=p.get("badge", ""),
                        seasonal=p.get("seasonal", [])
                    )
                    db.add(plant_obj)
                    plants_added += 1
            if plants_added > 0:
                db.commit()
                print(f"[SUCCESS] Seeded {plants_added} plants into database.")
            else:
                print("[INFO] Plants already up to date in database.")
                
            # Seed Reviews
            reviews_added = 0
            for r in reviews:
                existing = db.query(Review).filter(Review.name == r.get("name"), Review.text == r.get("text")).first()
                if not existing:
                    rev_obj = Review(
                        name=r.get("name", "Customer"),
                        loc=r.get("loc", "India"),
                        stars=int(r.get("stars", 5)),
                        text=r.get("text", ""),
                        plant=r.get("plant", "Green Shade Plant"),
                        avatar=r.get("avatar", "👤")
                    )
                    db.add(rev_obj)
                    reviews_added += 1
            if reviews_added > 0:
                db.commit()
                print(f"[SUCCESS] Seeded {reviews_added} reviews into database.")
            else:
                print("[INFO] Reviews already up to date in database.")
                
    finally:
        db.close()

if __name__ == "__main__":
    print("[INIT] Initializing Green Shade Nursery Database...")
    seed_database()
    print("[READY] Database setup & seed completed successfully!")
