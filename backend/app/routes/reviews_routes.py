from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.review import Review
from app.schemas.review_schema import ReviewCreate, ReviewResponse

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])

@router.get("", response_model=List[ReviewResponse])
def get_reviews(db: Session = Depends(get_db)):
    return db.query(Review).order_by(Review.id.asc()).all()

@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def submit_review(review_in: ReviewCreate, db: Session = Depends(get_db)):
    review = Review(**review_in.model_dump())
    db.add(review)
    db.commit()
    db.refresh(review)
    return review
