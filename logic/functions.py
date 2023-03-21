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
    return db.get_all(*args, **kwargs)

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

@logger.catch
def generating_aviable_pathes(route: logic.entities.Route) -> list[logic.entities.Path]:
    all_spots = get_routes_spots(route)
    results: list[logic.entities.Path] = []

    if not is_actual_route(route):
        return []

    sits: dict[logic.entities.HashId, dict[logic.entities.HashId, int]] = {
        all_spots[i].id: {
            all_spots[j].id: 0 for j in range(i+1, len(all_spots))
        } for i in range(len(all_spots)-1)
    }

    for passenger in route.passengers:
        sits[passenger.moving_from.id][passenger.moving_towards.id] += 1

    for i in range(len(all_spots)-1):
        for j in range(i+1, len(all_spots)):
            start_spot = all_spots[i]
            end_spot = all_spots[j]

            if not all((
                is_actual_spot(start_spot),
                route.prices.get(start_spot.id, {}).get(end_spot.id),
                sits[start_spot.id][end_spot.id] < route.passengers_number
            )):
                continue

            results.append(logic.entities.Path(
                move_from=start_spot,
                move_to=end_spot,
                price=route.prices[start_spot.id][end_spot.id],
                root_route_id=route.id,
                passengers=[
                    passenger for passenger in route.passengers 
                    if passenger.moving_from.id == start_spot.id \
                    and passenger.moving_towards.id == end_spot.id
                ]
            ))
    
    return results

def is_actual_spot(spot: logic.entities.Spot) -> bool:
    return spot.date < datetime.datetime.now()

def is_actual_route(route: logic.entities.Route) -> bool:
    return is_actual_spot(route.move_to if not route.sub_spots else route.sub_spots[-1])

def get_routes_spots(route: logic.entities.Route) -> list[logic.entities.Spot]:
    routes_spots = route.sub_spots.copy()
    routes_spots.insert(0, route.move_from)
    routes_spots.insert(-1, route.move_to)

    return routes_spots
