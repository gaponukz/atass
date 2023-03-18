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
        return [Route(**route) for route in self.routes if _filter(Route(**route))]

    def get_one(self, route_hash: str) -> Route | None:
        finded_objects = [route for route in self.routes if Route(**route).id == route_hash]

        if finded_objects:
            return Route(**finded_objects[0])

    def add_one(self, route: Route):
        self.routes.append(route.dict())
        self._update_file()

    def remove_one(self, route_hash: str):
        import pydantic
        for route in self.routes:
            try:
                if Route(**route).id == route_hash:
                    self.routes.remove(route)
                    self._update_file()

                    return
            
            except pydantic.error_wrappers.ValidationError as error:
                print(error.json())
    
    def change_one(self, route_hash: str, **fields) -> Route:
        for item in fields:
            try:
                fields[item] = fields[item].dict()

            except AttributeError:
                pass

        for route in self.routes:
            if route.get('id') == route_hash:
                route.update(fields)
                self._update_file()
                
                return Route(**route)

    def remove_many(self, _filter: typing.Callable[[Route], bool]):
        for route in self.routes:
            if _filter(Route(**route)):
                self.routes.remove(route)
        
        self._update_file()
    
    def change_many(self, _filter: typing.Callable[[Route], bool], **fields) -> list[Route]:
        changed = []

        for item in fields:
            try:
                fields[item] = fields[item].dict()

            except AttributeError:
                pass
        
        for route in self.routes:
            if _filter(Route(**route)):
                route.update(fields)
                changed.append(Route(**route))

        self._update_file()
        
        return changed
    
    def _update_file(self):
        with open(self._filename, 'w', encoding='utf-8') as out:
            json.dump(self.routes, out, indent=4, cls=EnhancedJSONEncoder, default=str)

    def __len__(self):
        return len(self.routes)
