from fastapi import APIRouter, FastAPI
from pydantic import BaseModel


class IncrementRequest(BaseModel):
    value: float


class IncrementResponse(BaseModel):
    result: float


app = FastAPI()
router = APIRouter()


@router.post("/increment", response_model=IncrementResponse)
def increment(payload: IncrementRequest) -> IncrementResponse:
    return IncrementResponse(result=payload.value + 1)


app.include_router(router)
app.include_router(router, prefix="/api/py")
