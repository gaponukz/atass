import typing
import datetime
from src.business.entities import Route
from src.business.entities import Path
from src.business.entities import Spot
from src.business.entities import Passenger
from src.business.entities import HashId

class ReadAbleDataBase(typing.Protocol):
    def read_all(self) -> list[Route]: ...


class RouteAvailabilityUseCase:
    def __init__(self, db: ReadAbleDataBase) -> None:
        self._db = db
    
    def generate_all_pathes(self) -> list[Path]:
        pathes = []
        routes = self._db.read_all()

        for route in routes:
            pathes += self._generating_aviable_pathes(route)
        
        return pathes
    
    def _generating_aviable_pathes(self, route: Route) -> list[Path]:
        all_spots = self._get_routes_spots(route)

        results: list[Path] = []
        if not self._is_actual_route(route):
            return []

        sits: dict[HashId, dict[HashId, int]] = self._get_route_sits(all_spots, route.passengers)

        for start_spot, end_spot in self._iter_different_spots(all_spots):   
            if not all((
                self._is_actual_spot(start_spot),
                route.prices.get(start_spot.id, {}).get(end_spot.id),
                sits[start_spot.id][end_spot.id] < route.passengers_number
            )):
                continue

            results.append(Path(
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

    def _get_route_sits(self, all_spots: list[Spot], passengers: list[Passenger]) -> dict[HashId, dict[HashId, int]]:
        sits = {
            all_spots[i].id: {
                all_spots[j].id: 0 for j in range(i+1, len(all_spots))
            } for i in range(len(all_spots)-1)
        }

        for passenger in passengers:
            sits[passenger.moving_from.id][passenger.moving_towards.id] += 1
        
        return sits
    
    def _iter_different_spots(self, all_spots: list[Spot]) -> typing.Iterator[tuple[Spot, Spot]]:
        for i in range(len(all_spots)-1):
            for j in range(i+1, len(all_spots)):
                yield (all_spots[i], all_spots[j])

    def _is_actual_spot(self, spot: Spot) -> bool:
        return spot.date < datetime.datetime.now()

    def _is_actual_route(self, route: Route) -> bool:
        return self._is_actual_spot(route.move_to if not route.sub_spots else route.sub_spots[-1])

    def _get_routes_spots(self, route: Route) -> list[Spot]:
        routes_spots = route.sub_spots.copy()
        routes_spots.insert(0, route.move_from)
        routes_spots.insert(-1, route.move_to)

        return routes_spots
