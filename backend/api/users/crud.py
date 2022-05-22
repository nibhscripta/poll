from fastapi import status, HTTPException
from sqlalchemy.orm import Session


from .models import User
from .schemas import CreateUser

from ..security import password

def create_new_user(db: Session, new_user: CreateUser):
    existing_user = db.query(User).filter(User.username == new_user.username).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username taken")
    existing_user = db.query(User).filter(User.email == new_user.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email registered to another user")
    hashed_password = password.hash(new_user.password)
    new_user.password = hashed_password
    new_user_model = User(**new_user.dict())
    db.add(new_user_model)
    db.commit()
    db.refresh(new_user_model)
    return new_user_model.__dict__