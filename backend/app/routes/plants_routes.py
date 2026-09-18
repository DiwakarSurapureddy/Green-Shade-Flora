from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.plant import Plant
from app.schemas.plant_schema import PlantCreate, PlantUpdate, PlantResponse

router = APIRouter(prefix="/api/plants", tags=["Plants"])

@router.get("", response_model=List[PlantResponse])
def get_plants(
    category: Optional[str] = Query(None, description="Filter by category (e.g. Indoor, Flower, Fruit, Outdoor, Bonsai)"),
    trending: Optional[bool] = Query(None, description="Filter trending plants"),
    search: Optional[str] = Query(None, description="Search by plant name or description"),
    db: Session = Depends(get_db)
):
    query = db.query(Plant)
    
    if category and category.lower() != "all":
        query = query.filter(Plant.cat.ilike(category))
    if trending is not None:
        query = query.filter(Plant.trending == trending)
    if search:
        search_fmt = f"%{search.strip()}%"
        query = query.filter((Plant.name.ilike(search_fmt)) | (Plant.desc.ilike(search_fmt)))
        
    return query.all()

@router.get("/categories/all", response_model=List[str])
def get_all_categories(db: Session = Depends(get_db)):
    results = db.query(Plant.cat).distinct().all()
    return [r[0] for r in results if r[0]]

@router.get("/{plant_id}", response_model=PlantResponse)
def get_plant_by_id(plant_id: str, db: Session = Depends(get_db)):
    plant = db.query(Plant).filter(Plant.id == plant_id).first()
    if not plant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Plant '{plant_id}' not found")
    return plant

@router.post("", response_model=PlantResponse, status_code=status.HTTP_201_CREATED)
def create_plant(plant_in: PlantCreate, db: Session = Depends(get_db)):
    existing = db.query(Plant).filter(Plant.id == plant_in.id).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Plant with id '{plant_in.id}' already exists")
    
    plant = Plant(**plant_in.model_dump())
    db.add(plant)
    db.commit()
    db.refresh(plant)
    return plant

@router.put("/{plant_id}", response_model=PlantResponse)
def update_plant(plant_id: str, plant_in: PlantUpdate, db: Session = Depends(get_db)):
    plant = db.query(Plant).filter(Plant.id == plant_id).first()
    if not plant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Plant '{plant_id}' not found")
    
    update_data = plant_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(plant, key, value)
        
    db.commit()
    db.refresh(plant)
    return plant

@router.delete("/{plant_id}", status_code=status.HTTP_200_OK)
def delete_plant(plant_id: str, db: Session = Depends(get_db)):
    plant = db.query(Plant).filter(Plant.id == plant_id).first()
    if not plant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Plant '{plant_id}' not found")
    
    db.delete(plant)
    db.commit()
    return {"message": f"Plant '{plant_id}' successfully deleted"}
