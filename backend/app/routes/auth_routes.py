from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import jwt
import hashlib
from app.database import get_db
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, ADMIN_USERNAME, ADMIN_PASSWORD
from app.models.user import AdminUser
from app.schemas.auth_schema import LoginRequest, TokenResponse

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login", response_model=TokenResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    username = credentials.username.strip()
    password = credentials.password.strip()
    
    # Check database user
    user = db.query(AdminUser).filter(AdminUser.username == username).first()
    
    # If not yet seeded or matching admin default
    is_valid = False
    role = "admin"
    if user:
        if user.hashed_password == hash_password(password):
            is_valid = True
            role = user.role
    elif username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        is_valid = True
        
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    token = create_access_token(data={"sub": username, "role": role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "username": username,
        "role": role
    }

@router.get("/verify")
def verify_token():
    return {"status": "authenticated"}
