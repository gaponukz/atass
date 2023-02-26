from utils.entities import *
from utils.errors import *
from typing import TypedDict
import datetime

class ShortRoute(TypedDict):
    move_from: dict
    move_to: dict
    count: int

def get_unique_routes(routes: list[Route]) -> dict[str, ShortRoute]:
    unique: dict[str, ShortRoute] = {}

    for route in routes:
        key = f"{route.move_from.place.city}-{route.move_to.place.city}"

        if not unique[key].get(key):
            unique[key] = {
                "move_from": route.move_from.place.to_dict(),
                "move_to": route.move_to.place.to_dict(),
                "count": 0
            }
        unique[key]["count"] += 1
    
    return unique

def is_actual_route(route: Route) -> bool:    
    return route.move_to.date < datetime.datetime.now()


