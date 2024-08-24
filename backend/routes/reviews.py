from fastapi import APIRouter, HTTPException
from firebase_admin import firestore
from pydantic import BaseModel
from typing import List

router = APIRouter()
db = firestore.client()

class Review(BaseModel):
    user_id: str
    rating: int
    text: str

@router.post("/products/{product_id}/reviews/")
async def create_review(product_id: str, review: Review):
    product_ref = db.collection("products").document(product_id)
    if not product_ref.get().exists:
        raise HTTPException(status_code=404, detail="Product not found")
    
    review_ref = product_ref.collection("reviews").document()
    review_ref.set(review.dict())
    return {"id": review_ref.id, **review.dict()}

@router.get("/products/{product_id}/reviews/{review_id}")
async def read_review(product_id: str, review_id: str):
    review_ref = db.collection("products").document(product_id).collection("reviews").document(review_id)
    review = review_ref.get()
    if review.exists:
        return {"id": review.id, **review.to_dict()}
    raise HTTPException(status_code=404, detail="Review not found")

@router.get("/products/{product_id}/reviews/")
async def read_reviews(product_id: str):
    reviews = db.collection("products").document(product_id).collection("reviews").stream()
    return [{"id": review.id, **review.to_dict()} for review in reviews]

@router.put("/products/{product_id}/reviews/{review_id}")
async def update_review(product_id: str, review_id: str, review: Review):
    review_ref = db.collection("products").document(product_id).collection("reviews").document(review_id)
    if not review_ref.get().exists:
        raise HTTPException(status_code=404, detail="Review not found")
    review_ref.update(review.dict())
    return {"id": review_id, **review.dict()}

@router.delete("/products/{product_id}/reviews/{review_id}")
async def delete_review(product_id: str, review_id: str):
    review_ref = db.collection("products").document(product_id).collection("reviews").document(review_id)
    if not review_ref.get().exists:
        raise HTTPException(status_code=404, detail="Review not found")
    review_ref.delete()
    return {"message": "Review deleted successfully"}