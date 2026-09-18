from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from typing import List, Optional
import shutil
import time
from pathlib import Path
from app.database import get_db
from app.config import GALLERY_UPLOADS_DIR
from app.models.gallery import GalleryItem
from app.schemas.gallery_schema import GalleryResponse

router = APIRouter(prefix="/api/gallery", tags=["Gallery"])

import base64
from sqlalchemy import text

@router.get("", response_model=List[GalleryResponse])
def get_gallery_items(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    try:
        query = db.query(GalleryItem)
        if category and category.lower() != "all":
            query = query.filter(GalleryItem.category.ilike(category))
        return query.order_by(GalleryItem.created_at.desc()).all()
    except Exception as e:
        db.rollback()
        print(f"[WARN] Error fetching gallery items, attempting schema heal: {e}")
        try:
            with db.connection().begin():
                db.execute(text('ALTER TABLE gallery_items ADD COLUMN "desc" TEXT DEFAULT \'\''))
            query = db.query(GalleryItem)
            if category and category.lower() != "all":
                query = query.filter(GalleryItem.category.ilike(category))
            return query.order_by(GalleryItem.created_at.desc()).all()
        except Exception as e2:
            print(f"[ERROR] Gallery query fallback: {e2}")
            return []

@router.post("/upload", response_model=GalleryResponse, status_code=status.HTTP_201_CREATED)
async def upload_gallery_image(
    file: UploadFile = File(...),
    title: str = Form(...),
    category: str = Form("nursery"),
    desc: str = Form(""),
    db: Session = Depends(get_db)
):
    try:
        contents = await file.read()
        file_size = len(contents)
        
        orig_name = file.filename or "upload.jpg"
        ext = Path(orig_name).suffix.lower() or ".jpg"
        safe_filename = f"gallery_{int(time.time() * 1000)}{ext}"
        dest_path = GALLERY_UPLOADS_DIR / safe_filename
        
        # Save file to disk
        try:
            with open(dest_path, "wb") as buffer:
                buffer.write(contents)
        except Exception as fe:
            print(f"[WARN] Failed to write file to disk: {fe}")
            
        # For full persistence across Render ephemeral restarts, store data URI in DB if size <= 2.5MB
        mime_type = file.content_type or "image/jpeg"
        if file_size <= 2500000:
            b64_str = base64.b64encode(contents).decode("utf-8")
            image_url = f"data:{mime_type};base64,{b64_str}"
        else:
            image_url = f"/uploads/gallery/{safe_filename}"
            
        item = GalleryItem(
            title=title,
            category=category,
            desc=desc or "",
            image_url=image_url,
            file_name=safe_filename,
            file_size=file_size
        )
        db.add(item)
        db.commit()
        db.refresh(item)
        return item
    except Exception as e:
        db.rollback()
        print(f"[WARN] Gallery upload failed, attempting auto-repair: {e}")
        try:
            with db.connection().begin():
                db.execute(text('ALTER TABLE gallery_items ADD COLUMN "desc" TEXT DEFAULT \'\''))
            item = GalleryItem(
                title=title,
                category=category,
                desc=desc or "",
                image_url=image_url,
                file_name=safe_filename,
                file_size=file_size
            )
            db.add(item)
            db.commit()
            db.refresh(item)
            return item
        except Exception as e2:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to save gallery item: {str(e2)}")

@router.delete("/{item_id}", status_code=status.HTTP_200_OK)
def delete_gallery_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Gallery item {item_id} not found")
        
    # Attempt to remove file if on local disk
    if item.file_name:
        file_path = GALLERY_UPLOADS_DIR / item.file_name
        if file_path.exists():
            try:
                file_path.unlink()
            except Exception:
                pass
                
    db.delete(item)
    db.commit()
    return {"message": f"Gallery item {item_id} deleted successfully"}
