from fastapi import APIRouter

from .users.router import router as UserRouter
from .authentication.router import router as AuthenticationRouter
from .polls.router import router as PollsRouter

router = APIRouter(
    prefix='/api'
)


router.include_router(UserRouter)
router.include_router(AuthenticationRouter)
router.include_router(PollsRouter)

