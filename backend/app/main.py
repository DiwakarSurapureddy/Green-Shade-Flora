from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from app.config import APP_NAME, DEBUG, UPLOADS_DIR, GALLERY_UPLOADS_DIR
from app.seed_data import seed_database
from app.routes import plants_router, orders_router, inquiries_router, gallery_router, reviews_router, auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure tables exist & seed default data
    seed_database()
    yield
    # Shutdown

app = FastAPI(
    title=APP_NAME,
    description="REST API backend for Green Shade Nursery — managing plant inventory, customer orders, nursery gallery uploads, reviews, and admin auth.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS so Frontend can communicate without browser blocking
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for seamless development & deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.responses import FileResponse
from app.config import APP_NAME, DEBUG, UPLOADS_DIR, GALLERY_UPLOADS_DIR, FRONTEND_DIR

# Mount static file directory for uploaded nursery gallery images
GALLERY_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# Register all API routers
app.include_router(plants_router)
app.include_router(orders_router)
app.include_router(inquiries_router)
app.include_router(gallery_router)
app.include_router(reviews_router)
app.include_router(auth_router)

@app.get("/api/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": APP_NAME}

# Mount Frontend static assets (css, js, etc.) if Frontend directory exists
if FRONTEND_DIR.exists():
    css_dir = FRONTEND_DIR / "css"
    js_dir = FRONTEND_DIR / "js"
    if css_dir.exists():
        app.mount("/css", StaticFiles(directory=str(css_dir)), name="css")
    if js_dir.exists():
        app.mount("/js", StaticFiles(directory=str(js_dir)), name="js")

    @app.get("/", tags=["Frontend"])
    def serve_frontend():
        index_file = FRONTEND_DIR / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
        return {"message": f"Welcome to {APP_NAME}!", "status": "online"}

    @app.get("/login", tags=["Frontend"])
    def serve_login():
        login_file = FRONTEND_DIR / "login.html"
        if login_file.exists():
            return FileResponse(str(login_file))
        return FileResponse(str(FRONTEND_DIR / "index.html"))

    # Mount entire frontend as static fallback
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
else:
    @app.get("/", tags=["Root"])
    def root():
        return {
            "message": f"Welcome to {APP_NAME}!",
            "status": "online",
            "docs": "/docs",
            "endpoints": {
                "plants": "/api/plants",
                "orders": "/api/orders",
                "gallery": "/api/gallery",
                "reviews": "/api/reviews",
                "auth": "/api/auth/login"
            }
        }
