import typing

from src.interfaces import IRouteDataBase
from src.logic.entities import Route

def _check_filter(entity, _filter):
    if not _filter:
        return True
    
    entity = entity.dict()

    def check_nested_fields(entity, _filter):
        for key, value in _filter.items():
            if key not in entity:
                return False
            
            if isinstance(value, dict):
                if not check_nested_fields(entity[key], value):
                    return False
            
            else:
                if entity[key] != value:
                    return False
            
        return True

    return check_nested_fields(entity, _filter)


class MemoryRouteDataBase(IRouteDataBase):
    def __init__(self):
        self.routes: list[Route] = []
    
    async def get_all(self, _filter: dict[str, typing.Any] = {}) -> list[Route]:
        return [route for route in self.routes if _check_filter(route, _filter)]

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
        self.routes = [route for route in self.routes if not _check_filter(route, _filter)]
    
    async def change_many(self, _filter: dict[str, typing.Any] = {}, **fields) -> list[Route]:
        changed = []

        for route in self.routes:
            if _check_filter(route, _filter):
                for key, value in fields.items():
                    setattr(route, key, value)

                changed.append(route)
        
        return changed

    def __len__(self):
        return len(self.routes)
