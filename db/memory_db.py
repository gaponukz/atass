import datetime
import typing

from db import IRouteDataBase
from entities import Route, Driver

class MemoryRouteDataBase(IRouteDataBase):
    def __init__(self):
        self.routes = []
    
    def get_all(self, _filter: typing.Callable[[Route], bool] = lambda _: True) -> list[Route]:
        return [route for route in self.routes if _filter(route)]

    def get_one(self, route_hash: str) -> Route:
        finded_objects = [route for route in self.routes if route.id == route_hash]

        if finded_objects:
            return finded_objects[0]   

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

if __name__ == "__main__":
    route = Route(
        move_from = "Kiyv",
        move_to = "Lviv",
        date = datetime.datetime.now(),
        travel_time = 100,
        driver = Driver(
            first_name = "John",
            last_name = "Nut",
            phone_number = "+324243523"
        )
    )

    db = MemoryRouteDataBase()

    db.add_one(route)

    print(db.get_all(lambda route: route.move_from == "Kiyv")[0])