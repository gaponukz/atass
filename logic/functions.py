from logic.entities import *
from logic.errors import *
import datetime

def get_unique_routes(routes: list[Route]) -> dict[str, ShortRoute]:
    unique: dict[str, ShortRoute] = {}

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

def is_actual_route(route: Route) -> bool:    
    return route.move_to.date < datetime.datetime.now()
