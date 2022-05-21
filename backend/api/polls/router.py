from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..security.oauth2 import get_current_user
from .schemas import CreatePoll, PollResponse
from .models import Poll
from ..users.models import User


router = APIRouter(
    prefix='/p',
    tags=['Polls']
)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=PollResponse)
def create_poll(new_poll: CreatePoll, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    new_poll = Poll(owner_username=current_user.username, **new_poll.dict())
    db.add(new_poll)
    db.commit()
    db.refresh(new_poll)
    return new_poll


@router.get('/{username}', response_model=List[PollResponse])
def get_user(username: str, page: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='user does not exist')
    polls = db.query(Poll).filter(Poll.owner_username == username).limit(30).offset(page).all()
    return polls



