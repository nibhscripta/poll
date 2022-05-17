from pydantic import BaseModel, EmailStr, Field, constr
from datetime import datetime


class PublicUser(BaseModel):
    username: str
    created_at: datetime
    
    class Config:
        orm_mode: True
        
class PrivateUser(PublicUser):
    email: EmailStr
    
class CreateUser(BaseModel):
    username: str
    email: EmailStr
    password: str
    
class AuthenticateUser(BaseModel):
    auth_name: str
    password: str
    