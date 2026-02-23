from fastapi import FastAPI
from pydantic import BaseModel


class IncrementRequest(BaseModel):
    value: float


class IncrementResponse(BaseModel):
    result: float


app = FastAPI()


@app.post("/increment", response_model=IncrementResponse)
def increment(payload: IncrementRequest) -> IncrementResponse:
    return IncrementResponse(result=payload.value + 1)
