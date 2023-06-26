from fastapi import Depends
from fastapi import FastAPI
from uvicorn import run

from internal import admin
from public import public

# Import all dependencies
from src.interfaces import IRouteDataBase
from src.db.json_route_db import JsonRouteDataBase
from src.interfaces import IService
from src.logic.usecase import Service

from src.authentication.authentication import admin_required

# Setup app
app = FastAPI()
app.include_router(public.router, prefix="/public")
app.include_router(admin.router, dependencies=[Depends(admin_required)], prefix="/admin")
app.dependency_overrides[IRouteDataBase] = (lambda db: lambda: db)(JsonRouteDataBase())
app.dependency_overrides[IService] = Service

if __name__ == "__main__":
    run("server:app", host="localhost", port=5000, reload=True)
