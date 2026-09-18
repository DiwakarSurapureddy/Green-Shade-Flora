import uvicorn
from app.config import HOST, PORT, DEBUG

if __name__ == "__main__":
    print(f">> Starting Green Shade Nursery API Server on http://{HOST}:{PORT}")
    print(f">> Interactive Swagger UI Documentation: http://{HOST}:{PORT}/docs")
    uvicorn.run(
        "app.main:app",
        host=HOST,
        port=PORT,
        reload=DEBUG
    )
