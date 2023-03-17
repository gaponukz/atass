import dateutil.parser
import dataclasses
import typing
import json
import os

from db.route_db import IRouteDataBase
from logic.entities import Route

def datetime_parser(json_dict):
    for key, value in json_dict.items():
        try:
            json_dict[key] = dateutil.parser.parse(value)

        except (ValueError, AttributeError, TypeError):
            pass

    return json_dict

class EnhancedJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if dataclasses.is_dataclass(obj):
            return dataclasses.asdict(obj)

        return super().default(obj)

class JsonRouteDataBase(IRouteDataBase):
    def __init__(self, filename = "db.json"):
        self._filename = filename
        self.routes = []

        if os.path.exists(self._filename):
            with open(self._filename, 'r', encoding='utf-8') as out:
                self.routes = json.load(out, object_hook=datetime_parser)
        
        self._update_file()
    
    def get_all(self, _filter: typing.Callable[[Route], bool] = lambda _: True) -> list[Route]:
        return [Route.from_dict(route) for route in self.routes if _filter(Route.from_dict(route))]

    def get_one(self, route_hash: str) -> Route:
        finded_objects = [route for route in self.routes if Route.from_dict(route).id == route_hash]

        if finded_objects:
            return Route.from_dict(finded_objects[0])   

    def add_one(self, route: Route):
        self.routes.append(route.to_dict())
        self._update_file()

    def remove_one(self, route_hash: str):
        for route in self.routes:
            if Route.from_dict(route).id == route_hash:
                self.routes.remove(route)
                self._update_file()

                return
    
    def change_one(self, route_hash: str, **fields) -> Route:
        for route in self.routes:
            if Route.from_dict(route).id == route_hash:
                route.update(fields)
                self._update_file()
                
                return Route.from_dict(route)

    def remove_many(self, _filter: typing.Callable[[Route], bool]):
        for route in self.routes:
            if _filter(Route.from_dict(route)):
                self.routes.remove(route)
        
        self._update_file()
    
    def change_many(self, _filter: typing.Callable[[Route], bool], **fields) -> list[Route]:
        changed = []

        for route in self.routes:
            route_obj = Route.from_dict(route)

            if _filter(route_obj):
                route.update(fields)
                changed.append(route_obj)

        self._update_file()
        
        return changed
    
    def _update_file(self):
        with open(self._filename, 'w', encoding='utf-8') as out:
            json.dump(self.routes, out, indent=4, cls=EnhancedJSONEncoder, default=str)

    def __len__(self):
        return len(self.routes)
