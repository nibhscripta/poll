from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .users.router import router as UserRouter

origins = [
           "*"
           ]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get('/')
def hello():
    return {'message': 'hello world!'}

app.include_router(UserRouter)
