import typing
from src.business.entities import Route
from src.business.entities import HashId
from src.business.entities import ShortRoute
from src.business.errors import RouteNotFoundError

class ReadAbleDataBase(typing.Protocol):
    def read_all(self) -> list[Route]: ...

class ViewRoutesUseCase:
    def __init__(self, db: ReadAbleDataBase) -> None:
        self._db = db
    
    def get_unique_routes(self) -> list[ShortRoute]:
        routes = self._db.read_all()
        unique: dict[str, ShortRoute] = {}

        for route in routes:
            key = f"{route.move_from.place.city}-{route.move_to.place.city}"

            if not unique.get(key):
                unique[key] = self._shorten_route(route)
            
            unique[key].count += 1

        return list(unique.values())

    def get_routes_family_by_cities(self, move_from_city: str, move_to_city: str) -> list[Route]:
        routes = self._db.read_all()
        filtered = filter(lambda route: route.move_from.place.city == move_from_city 
                          and route.move_to.place.city == move_to_city, routes)

        return list(filtered)
    
    def get_route_by_id(self, route_id: HashId) -> Route:
        routes = self._db.read_all()
        filtered = list(filter(lambda route: route.id == route_id, routes))

        if not filtered:
            raise RouteNotFoundError(route_id)

        return filtered[0]

    def _shorten_route(self, route: Route) -> ShortRoute:
        return ShortRoute(
            move_from=route.move_from.place.copy(),
            move_to=route.move_to.place.copy()
        )
