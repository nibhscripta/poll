from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session

from .schemas import CreateUser, PrivateUser
from ..database import get_db
from .crud import create_new_user
from ..security.oauth2 import get_current_user
from .models import User


router = APIRouter(
    prefix='/u',
    tags=['Users']
)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=PrivateUser)
def create_user(new_user: CreateUser, db: Session = Depends(get_db)):
    new_user = create_new_user(db, new_user)
    return new_user


@router.get('/{username}', response_model=PrivateUser)
def get_user(username: str, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    if username != current_user.username:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not authorized to perform this request')
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='user does not exist')
    return user.__dict__