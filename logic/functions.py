__all__ = (
    'get_unique_routes', 
    'get_routes_family_by_cities', 
    'get_route_by_id'
)

import datetime
import logic.entities
import logic.errors

from loguru import logger
from db.json_route_db import JsonRouteDataBase

db = JsonRouteDataBase()
logger.add("logging/functions.log")

@logger.catch
async def _get_all_routes(*args, **kwargs) -> list[logic.entities.Route]:
    logger.info("Try to get routes from database")
    try:
        return db.get_all(*args, **kwargs)

    except Exception as error:
        logger.warning(f"Could not get routes, {error.__class__.__name__} {error}")
        raise error

@logger.catch
async def get_unique_routes() -> list[logic.entities.ShortRoute]:
    routes = await _get_all_routes()
    unique: dict[str, logic.entities.ShortRoute] = {}

    for route in routes:
        key = f"{route.move_from.place.city}-{route.move_to.place.city}"

        if not unique.get(key):
            unique[key] = {
                "move_from": route.move_from.place,
                "move_to": route.move_to.place,
                "count": 0
            }
        unique[key]["count"] += 1
    
    return list(unique.values())

@logger.catch
async def get_routes_family_by_cities(move_from_city: str, move_to_city: str) -> list[logic.entities.Route]:
    return db.get_all(lambda route: route.move_from.place.city == move_from_city and route.move_to.place.city == move_to_city) 

@logger.catch
async def get_route_by_id(route_id: logic.entities.HashId) -> logic.entities.Route:
    if not (route := db.get_one(route_id)):
        raise logic.errors.RouteNotFoundError(route_id)
    
    return route

def is_actual_route(route: logic.entities.Route) -> bool:    
    return route.move_to.date < datetime.datetime.now()
