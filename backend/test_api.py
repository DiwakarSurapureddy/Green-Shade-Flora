from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_endpoints():
    print("Testing GET / ...")
    r = client.get("/")
    assert r.status_code == 200, f"Expected 200, got {r.status_code}"
    print("  Root response:", r.json()["message"])

    print("Testing GET /api/health ...")
    r = client.get("/api/health")
    assert r.status_code == 200
    print("  Health check:", r.json())

    print("Testing GET /api/plants ...")
    r = client.get("/api/plants")
    assert r.status_code == 200
    plants = r.json()
    assert len(plants) >= 30, f"Expected at least 30 plants, got {len(plants)}"
    print(f"  Retrieved {len(plants)} plants successfully!")
    print(f"  Sample plant: {plants[0]['name']} (Price: Rs.{plants[0]['price']})")

    print("Testing GET /api/reviews ...")
    r = client.get("/api/reviews")
    assert r.status_code == 200
    reviews = r.json()
    assert len(reviews) >= 6
    print(f"  Retrieved {len(reviews)} reviews successfully!")

    print("Testing POST /api/orders ...")
    order_data = {
        "name": "Diwakar Test",
        "phone": "9876543210",
        "email": "test@greenshadenursery.com",
        "city": "Kadiyam",
        "address": "Main Road, Kadiyam, Andhra Pradesh",
        "plants": "Snake Plant, Bougainvillea",
        "qty": 2,
        "type": "retail",
        "notes": "Testing backend order creation"
    }
    r = client.post("/api/orders", json=order_data)
    assert r.status_code == 201, f"Expected 201, got {r.status_code}: {r.text}"
    order = r.json()
    print(f"  Created order {order['order_code']} for {order['name']}")

    print("Testing GET /api/orders ...")
    r = client.get("/api/orders")
    assert r.status_code == 200
    orders = r.json()
    assert len(orders) >= 1
    print(f"  Found {len(orders)} order(s) in database")

    print("Testing POST /api/auth/login ...")
    login_data = {
        "username": "admin",
        "password": "nursery@123"
    }
    r = client.post("/api/auth/login", json=login_data)
    assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
    token_resp = r.json()
    assert "access_token" in token_resp
    print(f"  Admin login successful! Token type: {token_resp['token_type']}")

    print("\nALL BACKEND API TESTS PASSED 100%! EXCELLENT!\n")

if __name__ == "__main__":
    test_endpoints()
