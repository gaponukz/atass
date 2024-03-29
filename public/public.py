from fastapi import APIRouter
from fastapi import Depends
from loguru import logger

from src.logic import usecase
from src.logic import entities

router = APIRouter()
logger.add("logging/admin.log")

@logger.catch
@router.get("/get_unique_routes")
async def unique_routes_page(
        service: usecase.IService = Depends()
    ) -> list[entities.ShortRoute]:
    
    return await service.get_unique_routes()
