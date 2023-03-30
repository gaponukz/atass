from fastapi import APIRouter
from fastapi import Depends
from loguru import logger

from src.logic import functions
from src.logic import entities

from src.web_entities import Response

router = APIRouter()
logger.add("logging/admin.log")

@logger.catch
@router.get("/get_unique_routes")
async def unique_routes_page(
        service: functions.IService = Depends()
    ) -> Response[list[entities.ShortRoute]]:
    
    return Response(body = await service.get_unique_routes())
