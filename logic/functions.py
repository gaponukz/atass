import sys
import datetime
import logic.entities
import logic.errors

from loguru import logger
from db.json_route_db import JsonRouteDataBase

db = JsonRouteDataBase()
logger.add(sys.stdout, colorize=True, format="<green>{time:HH:mm:ss}</green> | {level} | <level>{message}</level>")

async def get_unique_routes() -> dict[str, logic.entities.ShortRoute]:
    routes = db.get_all()
    unique: dict[str, logic.entities.ShortRoute] = {}

    for route in routes:
        key = f"{route.move_from.place.city}-{route.move_to.place.city}"

        if not unique[key].get(key):
            unique[key] = {
                "move_from": route.move_from.place.dict(),
                "move_to": route.move_to.place.dict(),
                "count": 0
            }
        unique[key]["count"] += 1
    
    return unique

async def get_routes_family_by_cities(move_from_city: str, move_to_city: str) -> list[logic.entities.Route]:
    return db.get_all(lambda route: route.move_from.place.city == move_from_city and route.move_to.place.city == move_to_city) 

async def get_route_by_id(route_id: logic.entities.HashId) -> logic.entities.Route:
    try:
        route = db.get_one(route_id)

        if not route:
            raise logic.errors.RouteNotFoundError(route_id)
        
        return route
        
    except Exception as error:
        logger.exception(error)

        raise error

def is_actual_route(route: logic.entities.Route) -> bool:    
    return route.move_to.date < datetime.datetime.now()
