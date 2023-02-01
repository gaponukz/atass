import datetime
import dataclasses
import typing
import json
import abc
import os

from entities import Route, Driver

class IRouteDataBase(abc.ABC):
    @abc.abstractmethod
    def get_all(self, _filter: typing.Callable[[Route], bool] = lambda _: True) -> list[Route]:
        pass

    @abc.abstractmethod
    def add_one(self, route: Route):
        pass
    
    @abc.abstractmethod
    def remove_one(self, route_hash: str):
        pass
    
    @abc.abstractmethod
    def change_one(self, route_hash: str, **fields) -> Route:
        pass

class EnhancedJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if dataclasses.is_dataclass(obj):
            return dataclasses.asdict(obj)

        return super().default(obj)

class RouteDataBaseJson(IRouteDataBase):
    def __init__(self, filename = "db.json"):
        self._filename = filename
        self.routes = []

        if os.path.exists(self._filename):
            with open(self._filename, 'r', encoding='utf-8') as out:
                self.routes = json.load(out)
        
        self._update_file()
    
    def get_all(self, _filter: typing.Callable[[Route], bool] = lambda _: True) -> list[Route]:
        return [self.__to_object(route) for route in self.routes if _filter(self.__to_object(route))]
    
    def add_one(self, route: Route):
        self.routes.append(self.__from_object(route))
        self._update_file()

    def remove_one(self, route_hash: str):
        finded_objects = [route for route in self.routes if self.__to_object(route).id == route_hash]

        if finded_objects:
            self.routes.remove(finded_objects[0])
            self._update_file()
    
    def change_one(self, route_hash: str, **fields: str) -> Route:
        for route in self.routes:
            if self.__to_object(route).id == route_hash:
                route.update(fields)
                self._update_file()
                
                return self.__to_object(route)
    
    def _update_file(self):
        with open(self._filename, 'w', encoding='utf-8') as out:
            json.dump(self.routes, out, indent=4, cls=EnhancedJSONEncoder, default=str)

    def __to_object(self, route: dict) -> Route:
        return Route(**route)
    
    def __from_object(self, route: Route) -> dict:
        dictionary = dataclasses.asdict(route)
        dictionary.update({"id": route.id})

        return dictionary

if __name__ == '__main__':
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

    db = RouteDataBaseJson()

    # db.add_one(route)

    print(db.get_all(lambda route: route.move_from == "Kiyv")[0])

    print(db.change_one("45d0fb88069f5efb70cbe3e0dcb5412f1628d75b387cb8dec04dc05cadae9726", **{"move_to": "Ivano Frankivsk"}))
