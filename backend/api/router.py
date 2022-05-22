from fastapi import APIRouter

from .users.router import router as UserRouter
from .authentication.router import router as AuthenticationRouter

router = APIRouter(
    prefix='/api'
)


router.include_router(UserRouter)
router.include_router(AuthenticationRouter)

