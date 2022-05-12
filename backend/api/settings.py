from pydantic import BaseSettings


class Settings(BaseSettings):
    database_hostname: str = "localhost"
    database_port: str
    database_name: str
    database_username: str
    database_password: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    refresh_token_expire_minutes: int
    
    class Config:
        env_file = ".env" 
        # env_file_encoding = 'utf-8'
        # case_sensitive = False
    

settings = Settings()