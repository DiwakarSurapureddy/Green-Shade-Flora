from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
import time
from app.database import get_db
from app.models.order import Order
from app.schemas.order_schema import OrderCreate, OrderStatusUpdate, OrderResponse

router = APIRouter(prefix="/api/orders", tags=["Orders"])
inquiries_router = APIRouter(prefix="/api/inquiries", tags=["Inquiries"])

@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
@inquiries_router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def submit_order(order_in: OrderCreate, db: Session = Depends(get_db)):
    data = order_in.model_dump()
    if not data.get("order_code"):
        data["order_code"] = f"ORD-{int(time.time() * 1000)}"
        
    order = Order(**data)
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

@router.get("", response_model=List[OrderResponse])
@inquiries_router.get("", response_model=List[OrderResponse])
def get_orders(
    status_filter: Optional[str] = Query(None, alias="status"),
    order_type: Optional[str] = Query(None, alias="type"),
    db: Session = Depends(get_db)
):
    query = db.query(Order)
    if status_filter and status_filter.lower() != "all":
        query = query.filter(Order.status.ilike(status_filter))
    if order_type and order_type.lower() != "all":
        query = query.filter(Order.order_type.ilike(order_type))
        
    return query.order_by(Order.created_at.desc()).all()

@router.get("/{order_id}", response_model=OrderResponse)
@inquiries_router.get("/{order_id}", response_model=OrderResponse)
def get_order_by_id(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Order {order_id} not found")
    return order

@router.patch("/{order_id}/status", response_model=OrderResponse)
@inquiries_router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(order_id: int, status_update: OrderStatusUpdate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Order {order_id} not found")
    
    order.status = status_update.status
    db.commit()
    db.refresh(order)
    return order

@router.delete("/{order_id}", status_code=status.HTTP_200_OK)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Order {order_id} not found")
    
    db.delete(order)
    db.commit()
    return {"message": f"Order {order_id} deleted successfully"}
