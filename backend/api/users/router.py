from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session

from .schemas import CreateUser, PrivateUser
from .models import User
from ..database import get_db
from .crud import create_new_user


router = APIRouter(
    prefix='/users',
    tags=['Users']
)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=PrivateUser)
def create_user(new_user: CreateUser, db: Session = Depends(get_db)):
    new_user = create_new_user(db, new_user)
    return new_user


# @router.get('/{id}', response_model=user.UserResponse)
# def get_user(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
#     if id != current_user.id:
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not authorized to perform this request')
#     user = db.query(models.User).filter(models.User.id == id).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'user with id {id} does not exist.')
#     return user