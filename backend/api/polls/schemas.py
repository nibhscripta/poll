from pydantic import BaseModel, EmailStr, Field, constr
from datetime import datetime


class CreatePoll(BaseModel):
    name: str
    category: str = None
    
class PollResponse(CreatePoll):
    created_at: datetime
    owner_username: str
    
    class Config:
        orm_mode: True