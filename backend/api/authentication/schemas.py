from pydantic import BaseModel

class RefreshToken(BaseModel):
    refresh_token: str
    
class ReturnNewAccessToken(BaseModel):
    access_token: str