import typing
import datetime
from collections import defaultdict
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
        
        sits: defaultdict[str, defaultdict[str, bool]] = defaultdict(defaultdict)

        for passanger in route.passengers:
            move_from = list(filter(lambda s: s.id == passanger.moving_from_id, all_spots))[0]
            move_to = list(filter(lambda s: s.id == passanger.moving_towards_id, all_spots))[0]
            passing_spots = filter(lambda s: move_from.date <= s.date < move_to.date, all_spots)

            for spot in passing_spots:
                sits[passanger.id][spot.id] = True
                            
        for start_spot, end_spot in self._iter_different_spots(all_spots):
            if not all((
                self._is_actual_spot(start_spot),
                route.prices.get(start_spot.id, {}).get(end_spot.id)
            )):
                continue

            path_spots = filter(lambda s: start_spot.date <= s.date < end_spot.date, all_spots)

            for spot in path_spots:
                count = 0
                for col in sits:
                    if sits.get(col, {}).get(spot.id, False):
                        count += 1

                if count >= route.passengers_number:                    
                    break
            
            else:
                results.append(Path(
                    move_from=start_spot,
                    move_to=end_spot,
                    price=route.prices[start_spot.id][end_spot.id],
                    root_route_id=route.id
                ))

        return results
    
    def _get_route_sits(self, all_spots: list[Spot], passengers: list[Passenger]) -> dict[HashId, dict[HashId, int]]:
        sits = {
            all_spots[i].id: {
                all_spots[j].id: 0 for j in range(len(all_spots))
            } for i in range(len(all_spots))
        }

        for passenger in passengers:
            move_from_date = list(filter(lambda s: s.id == passenger.moving_from_id, all_spots))[0].date
            move_to_date = list(filter(lambda s: s.id == passenger.moving_towards_id, all_spots))[0].date

            for spot in filter(lambda s: move_from_date <= s.date < move_to_date, all_spots):
                for sit in sits[spot.id]:
                    sits[sit][spot.id] += 1
        
        return sits
    
    def _iter_different_spots(self, all_spots: list[Spot]) -> typing.Iterator[tuple[Spot, Spot]]:
        for i in range(len(all_spots)-1):
            for j in range(i+1, len(all_spots)):
                yield (all_spots[i], all_spots[j])

    def _is_actual_spot(self, spot: Spot) -> bool:
        return spot.date > datetime.datetime.now()

    def _is_actual_route(self, route: Route) -> bool:
        return self._is_actual_spot(route.move_to if not route.sub_spots else route.sub_spots[-1])

    def _get_routes_spots(self, route: Route) -> list[Spot]:
        routes_spots = route.sub_spots.copy()
        routes_spots.insert(0, route.move_from)
        routes_spots.insert(-1, route.move_to)

        return sorted(routes_spots, key=lambda s: s.date)
