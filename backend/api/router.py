from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session

from .users.router import router as UserRouter
from .authentication.router import router as AuthenticationRouter

router = APIRouter(
    prefix='/api'
)


router.include_router(UserRouter)
router.include_router(AuthenticationRouter)

