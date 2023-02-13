from utils.entities import *
from utils.errors import *

def get_unique_routes(routes: list[Route]) -> list[Route]:
    unique: dict[str, Route] = {}

    for route in routes:
        key = route.move_from.place.city + route.move_to.place.city
        
        unique[key] = route
    
    return list(unique.values())

def generate_pathes_from_route(route: Route) -> list[Path]:
    pathes: list[Path] = []
    all_spots = route.sub_spots.copy() + [route.move_to, route.move_from]

    for i in range(len(all_spots)):
        for j in range(i + 1, len(all_spots)):
            move_from = all_spots[i]
            move_to = all_spots[j]

            pathes.append(Path(
                move_from = move_from,
                move_to = move_to,
                root_route_id = route.id,
                price = route.prices[move_from.id][move_to.id],
                passengers = [
                    passenger for passenger in route.passengers 
                    if passenger.moving_from.id == move_from.id and passenger.moving_towards.id == move_to.id
                ]
            ))

    return pathes
