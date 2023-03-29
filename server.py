from fastapi import Depends
from fastapi import FastAPI
from uvicorn import run

from internal import admin
from public import public

from src.dependencies import admin_required

app = FastAPI()
app.include_router(public.router, prefix="/public")
app.include_router(admin.router, dependencies=[Depends(admin_required)], prefix="/admin")

if __name__ == "__main__":
    run("server:app", host="localhost", port=5000, reload=True)
