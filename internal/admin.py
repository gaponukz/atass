from fastapi import Depends
from fastapi import APIRouter
from loguru import logger

from src.logic import functions
from src.logic import entities
from src.logic import errors

from src.web_entities import AddRoutesDTO
from src.web_entities import Response

router = APIRouter()
logger.add("logging/admin.log")

@logger.catch
@router.get("/get_routes_family")
async def get_routes_family_page(
        move_from_city: str,
        move_to_city: str,
        service: functions.IService = Depends()
    ) -> Response[list[entities.Route]]:
    
    return Response(body = await service.get_routes_family_by_cities(move_from_city, move_to_city))

@logger.catch
@router.get("/get_route")
async def get_route_page(
        route_id: entities.HashId,
        service: functions.IService = Depends()
    ) -> Response[entities.Route]:
    
    try:
        return Response(body = await service.get_route_by_id(route_id))
    
    except errors.RouteNotFoundError as error:
        return Response(
            status = 404,
            message = f"{error.__class__.__name__}: {error}",
            body = None
        )

@logger.catch
@router.post("/add_routes")
async def add_routes_page(
        routes_instruction: AddRoutesDTO,
        service: functions.IService = Depends()
    ) -> Response[list[entities.Route]]:
    
    return Response(body = service.add_routes_from_prototype(
        routes_instruction.route_prototype,
        routes_instruction.datetimes
    ))
