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

def is_actual_spot(spot: logic.entities.Spot) -> bool:
    return spot.date < datetime.datetime.now()

def is_actual_route(route: logic.entities.Route) -> bool:
    return is_actual_spot(route.move_to if not route.sub_spots else route.sub_spots[-1])

'''
def generating_aviable_pathes(route: logic.entities.Route) -> list[logic.entities.Path]:
    # TODO: make it work correctly 
    all_spots = route.sub_spots
    all_spots.insert(0, route.move_from)
    all_spots.insert(-1, route.move_to)

    if not all_spots[-1].date < datetime.datetime.now():
        return False

    active_spots_id = [_route.id for _route in all_spots if _route.date < datetime.datetime.now()]
    sits = {item: {jtem: 0 for jtem in active_spots_id if jtem.id != item.id} for item in active_spots_id}

    for passenger in route.passengers:
        _from = active_spots_id.index(passenger.moving_from.id)+1
        to = active_spots_id.index(passenger.moving_towards.id)

        for spot in active_spots_id[_from:to]:
            if sits[passenger.moving_from.id][spot] == route.passengers_number:
                return False
    
    return True
'''
