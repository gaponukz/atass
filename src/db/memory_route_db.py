import typing

from src.interfaces import IRouteDataBase
from src.utils import FilterComparatorTemplate
from src.logic.entities import Route

class MemoryRouteDataBase(IRouteDataBase, FilterComparatorTemplate):
    def __init__(self):
        self.routes: list[Route] = []
    
    async def get_all(self, _filter: dict[str, typing.Any] = {}) -> list[Route]:
        return [route for route in self.routes if self._compare_filters(route, _filter)]

    async def get_one(self, route_hash: str) -> Route:
        for route in self.routes:
            if route.id == route_hash:
                return route

    async def add_one(self, route: Route):
        self.routes.append(route)

    async def remove_one(self, route_hash: str):
        for route in self.routes:
            if route.id == route_hash:
                self.routes.remove(route)
                return
    
    async def change_one(self, route_hash: str, **fields) -> Route:
        for route in self.routes:
            if route.id == route_hash:
                for key, value in fields.items():
                    setattr(route, key, value)
                
                return route

    async def remove_many(self, _filter: dict[str, typing.Any] = {}):        
        self.routes = [route for route in self.routes if not self._compare_filters(route, _filter)]
    
    async def change_many(self, _filter: dict[str, typing.Any] = {}, **fields) -> list[Route]:
        changed = []

        for route in self.routes:
            if self._compare_filters(route, _filter):
                for key, value in fields.items():
                    setattr(route, key, value)

                changed.append(route)
        
        return changed

    def _entity_hook(self, entity: Route) -> dict[str, typing.Any]:
        return entity.dict()

    def __len__(self):
        return len(self.routes)
