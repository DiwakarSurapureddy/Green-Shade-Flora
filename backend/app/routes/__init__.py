from app.routes.plants_routes import router as plants_router
from app.routes.orders_routes import router as orders_router, inquiries_router
from app.routes.gallery_routes import router as gallery_router
from app.routes.reviews_routes import router as reviews_router
from app.routes.auth_routes import router as auth_router

__all__ = ["plants_router", "orders_router", "inquiries_router", "gallery_router", "reviews_router", "auth_router"]
