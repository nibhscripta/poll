from pydantic import BaseModel, EmailStr
from datetime import datetime


class PublicUser(BaseModel):
    username: str
    created_at: datetime
    
    class Config:
        orm_mode: True
        
class PrivateUser(PublicUser):
    email: EmailStr
    
    class Config:
        orm_mode: True
    
class CreateUser(BaseModel):
    username: str
    email: EmailStr
    password: str
    
class AuthenticateUser(BaseModel):
    auth_name: str
    password: str
    