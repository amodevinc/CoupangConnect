# backend/main.py
from fastapi import FastAPI
from routes import users, products, reviews, shared_carts, group_discounts

app = FastAPI()

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(reviews.router, prefix="/products", tags=["reviews"])
app.include_router(shared_carts.router, prefix="/shared-carts", tags=["shared-carts"])
app.include_router(group_discounts.router, prefix="/group-discounts", tags=["group-discounts"])

@app.get("/")
async def root():
    return {"message": "Welcome to CoupangConnect API"}