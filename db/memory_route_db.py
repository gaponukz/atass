import typing

from db.route_db import IRouteDataBase
from db.utils.entities import Route

class MemoryRouteDataBase(IRouteDataBase):
    def __init__(self):
        self.routes: list[Route] = []
    
    def get_all(self, _filter: typing.Callable[[Route], bool] = lambda _: True) -> list[Route]:
        return [route for route in self.routes if _filter(route)]

    def get_one(self, route_hash: str) -> Route:
        for route in self.routes:
            if route.id == route_hash:
                return route

    def add_one(self, route: Route):
        self.routes.append(route)

    def remove_one(self, route_hash: str):
        for route in self.routes:
            if route.id == route_hash:
                self.routes.remove(route)
                return
    
    def change_one(self, route_hash: str, **fields) -> Route:
        for route in self.routes:
            if route.id == route_hash:
                for key, value in fields.items():
                    setattr(route, key, value)
                
                return route

    def remove_many(self, _filter: typing.Callable[[Route], bool]):
        for route in self.routes:
            if _filter(route):
                self.routes.remove(route)
    
    def change_many(self, _filter: typing.Callable[[Route], bool], **fields) -> list[Route]:
        changed = []

        for route in self.routes:
            if _filter(route):
                for key, value in fields.items():
                    setattr(route, key, value)

                changed.append(route)
        
        return changed

    def __len__(self):
        return len(self.routes)
