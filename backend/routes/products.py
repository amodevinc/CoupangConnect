from fastapi import APIRouter, HTTPException
from firebase_admin import firestore
from pydantic import BaseModel
from typing import List, Optional
from fastapi.responses import StreamingResponse
import json

router = APIRouter()
db = firestore.client()

class Product(BaseModel):
    name: str
    brand: str
    categories: List[str]
    price: float
    description: Optional[str] = None

@router.post("/products/")
async def create_product(product: Product):
    doc_ref = db.collection("products").document()
    doc_ref.set(product.dict())
    return {"id": doc_ref.id, **product.dict()}

@router.get("/products/{product_id}")
async def read_product(product_id: str):
    doc_ref = db.collection("products").document(product_id)
    doc = doc_ref.get()
    if doc.exists:
        return {"id": doc.id, **doc.to_dict()}
    raise HTTPException(status_code=404, detail="Product not found")

@router.get("/products/")
def read_products():
    def generate():
        docs = db.collection("products").stream()
        for doc in docs:
            yield json.dumps({"id": doc.id, **doc.to_dict()}) + "\n"
    
    return StreamingResponse(generate(), media_type="application/x-ndjson")

@router.put("/products/{product_id}")
async def update_product(product_id: str, product: Product):
    doc_ref = db.collection("products").document(product_id)
    doc_ref.update(product.dict())
    return {"id": product_id, **product.dict()}

@router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    doc_ref = db.collection("products").document(product_id)
    doc_ref.delete()
    return {"message": "Product deleted successfully"}