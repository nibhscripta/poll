from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy import select


from ..database import get_db
from ..users.models import User
from ..security import password
from ..security.oauth2 import create_access_tokens, get_new_access_token
from ..security import tokenschema


router = APIRouter(
    prefix='',
    tags=['Authentication']
)


@router.post('/login/', response_model=tokenschema.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter((User.email == user_credentials.username) | (User.username == user_credentials.username)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Invalid credentials')
    if not password.verify(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Invalid credentials')
    access_tokens =  create_access_tokens(data={"username":user.username})
    return access_tokens
    
@router.get('/refresh_access/')
def refresh_access_token(refresh_token: str, db: Session = Depends(get_db)):
    return get_new_access_token(refresh_token, db)
