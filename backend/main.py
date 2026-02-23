from fastapi import Body, FastAPI

app = FastAPI()


@app.post("/increment")
@app.post("/py/increment")
def increment(value: float = Body(embed=True)) -> dict[str, float]:
    return {"result": value + 1}
