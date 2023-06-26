from fastapi import Depends
from fastapi import APIRouter
from fastapi import HTTPException
from loguru import logger

from src.logic import usecase
from src.logic import entities
from src.logic import errors

from src import dto

router = APIRouter()
logger.add("logging/admin.log")

@logger.catch
@router.get("/get_routes_family")
async def get_routes_family_page(
        move_from_city: str,
        move_to_city: str,
        service: usecase.IService = Depends()
    ) -> list[entities.Route]:
    
    return await service.get_routes_family_by_cities(move_from_city, move_to_city)

@logger.catch
@router.get("/get_route")
async def get_route_page(
        route_id: entities.HashId,
        service: usecase.IService = Depends()
    ) -> entities.Route:
    
    try:
        return await service.get_route_by_id(route_id)
    
    except errors.RouteNotFoundError as error:
        raise HTTPException(status_code=404, detail="Route not found") from error

@logger.catch
@router.post("/add_routes")
async def add_routes_page(
        routes_instruction: dto.AddRoutesDTO,
        service: usecase.IService = Depends()
    ) -> None:
    
    await service.add_routes_from_prototype(
        routes_instruction.route_prototype,
        routes_instruction.datetimes
    )

@logger.catch
@router.post("/change_route_info")
async def change_route_info_page(
        change_route: dto.ChangeUserDTO,
        service: usecase.IService = Depends()
    ) -> entities.Route:

    try:
        return await service.change_route_info(change_route.route_id, change_route.fields)
    
    except errors.RouteNotFoundError as error:
        raise HTTPException(status_code=404, detail="Route not found") from error