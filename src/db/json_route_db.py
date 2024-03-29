import os
import json
import typing
import aiofiles
import dateutil.parser

from src.interfaces import IRouteDataBase
from src.utils import FilterComparatorTemplate
from src.logic.entities import Route
from src.logic import errors

def _datetime_parser(json_dict):
    for key, value in json_dict.items():
        try:
            json_dict[key] = dateutil.parser.parse(value)

        except (ValueError, AttributeError, TypeError):
            pass

    return json_dict

class JsonRouteDataBase(IRouteDataBase, FilterComparatorTemplate):
    def __init__(self, filename = "db.json"):
        self._filename = filename
        self.routes = []

        if os.path.exists(self._filename):
            with open(self._filename, 'r', encoding='utf-8') as out:
                self.routes = json.load(out, object_hook=_datetime_parser)
    
    async def get_all(self, _filter: dict[str, typing.Any] = {}) -> list[Route]:
        return [Route(**route) for route in self.routes if self._compare_filters(route, _filter)]

    async def get_one(self, route_hash: str) -> Route:
        finded_objects = [route for route in self.routes if Route(**route).id == route_hash]

        if finded_objects:
            return Route(**finded_objects[0])
        
        raise errors.RouteNotFoundError(route_hash)

    async def add_one(self, route: Route):
        self.routes.append(route.dict())
        await self._update_file()

    async def remove_one(self, route_hash: str):
        for route in self.routes:
            if Route(**route).id == route_hash:
                self.routes.remove(route)
                await self._update_file()
                return
        
        raise errors.RouteNotFoundError(route_hash)
        
    async def change_one(self, route_hash: str, **fields) -> Route:
        for item in fields:
            try:
                fields[item] = fields[item].dict()

            except AttributeError:
                pass

        for route in self.routes:
            if route.get('id') == route_hash:
                route.update(fields)
                await self._update_file()
                
                return Route(**route)
        
        raise errors.RouteNotFoundError(route_hash)

    async def remove_many(self, _filter: dict[str, typing.Any] = {}):
        for route in self.routes:
            if self._compare_filters(route, _filter):
                self.routes.remove(route)
        
        await self._update_file()
    
    async def change_many(self, _filter: dict[str, typing.Any] = {}, **fields) -> list[Route]:
        changed = []

        for item in fields:
            try:
                fields[item] = fields[item].dict()

            except AttributeError:
                pass
        
        for route in self.routes:
            if self._compare_filters(route, _filter):
                route.update(fields)
                changed.append(Route(**route))

        await self._update_file()
        
        return changed
    
    async def _update_file(self):
        async with aiofiles.open(self._filename, 'w', encoding='utf-8') as out:
            await out.write(json.dumps(self.routes, indent=4, default=str))
