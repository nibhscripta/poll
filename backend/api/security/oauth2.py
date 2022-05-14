from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from .. import database
from ..users.models import User
from ..settings import settings
from . import tokenschema


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes
REFRESH_TOKEN_EXPIRE_MINUTES = settings.refresh_token_expire_minutes

def create_access_tokens(data: dict):
    to_encode_access = data.copy()
    to_encode_refresh = data.copy()
    expire_access = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire_refresh = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode_access.update({
        "exp": expire_access, 
        "token_type": "access_token"
        })
    to_encode_refresh.update({
        "exp": expire_refresh, 
        "token_type": "refresh_token"
        })
    encoded_access = jwt.encode(to_encode_access, SECRET_KEY, algorithm=ALGORITHM)
    encoded_refresh = jwt.encode(to_encode_refresh, SECRET_KEY, algorithm=ALGORITHM)
    return {
        "access_token": encoded_access,
        "refresh_token": encoded_refresh
    }


def verify_access_token(token:str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username:str = payload.get("username")
        if username is None: 
            raise credentials_exception
        token_data = tokenschema.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    return token_data   
    

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate credentials', headers={"WWW-Authenticate": "Bearer"})
    token = verify_access_token(token, credentials_exception)
    user = db.query(User).filter(User.username == token.username).first()
    return user