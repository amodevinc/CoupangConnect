# backend/routes/group_discounts.py
from fastapi import APIRouter

router = APIRouter()

@router.post("/")
async def create_group_discount():
    # Implement create group discount logic
    pass

@router.get("/{discount_id}")
async def get_group_discount(discount_id: int):
    # Implement get group discount logic
    pass

@router.post("/{discount_id}/join")
async def join_group_discount(discount_id: int):
    # Implement join group discount logic
    pass

@router.get("/{discount_id}/progress")
async def get_group_discount_progress(discount_id: int):
    # Implement get group discount progress logic
    pass