from fastapi import Response, status, HTTPException, Depends, APIRouter

from .schemas import CreateUser
from .models import User


router = APIRouter(
    prefix='/users',
    tags=['Users']
)


@router.post('')
def create_user(new_user: CreateUser):
    return new_user