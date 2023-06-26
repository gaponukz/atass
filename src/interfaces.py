import typing
import abc

from src.logic.entities import Path
from src.logic.entities import Route
from src.logic.entities import HashId
from src.logic.entities import ShortRoute
from src.logic.entities import RoutePrototype
from src.logic.entities import DatetimeObject

class IService(abc.ABC):
    '''
    Service that provides access to database and give us pretty data.
    '''
    async def get_unique_routes(self) -> list[ShortRoute]:
        '''
        Get short route description object, where-from and how many routes in base.
        '''
        ...

    async def get_routes_family_by_cities(self, move_from_city: str, move_to_city: str) -> list[Route]:
        '''
        Return all routes than move from `move_from_city` city to `move_to_city` city
        '''
        ...

    async def get_route_by_id(self, route_id: HashId) -> Route:
        '''
        Get one route by (uuid) identificator.
        '''
        ...

    async def generating_aviable_pathes(self, route: Route) -> list[Path]:
        '''
        Return all aviable pathes from route's spots.
        // Aviable is fresh date and free sits
        '''
        ...
    async def add_routes_from_prototype(self, route_prototype: RoutePrototype, datetimes: list[DatetimeObject]) -> list[Route]:
        '''
        Generating routes from route prototype and selected dates
        and return routes that successfully added to the database.
        Number of routes = number of datetimes.
        '''
        ...
    
    async def change_route_info(self, route_id: HashId, fields: dict[str, object]) -> Route:
        ...

class IRouteDataBase(abc.ABC):
    '''
    Abstract base class for routes databases
    '''
    @abc.abstractmethod
    async def get_all(self, _filter: dict[str, typing.Any] = {}) -> list[Route]:
        '''
        Fetch all routes from the database with the given filter
        '''
        ...

    @abc.abstractmethod
    async def get_one(self, route_hash: str) -> Route:
        '''
        Return one route from the database
        @param route_hash: The route id
        '''
        ...

    @abc.abstractmethod
    async def add_one(self, route: Route):
        '''
        Add one route to the database
        '''
        ...
    
    @abc.abstractmethod
    async def remove_one(self, route_hash: str):
        '''
        Remove one route from the database
        @param route_hash: The route id
        '''
        ...
    
    @abc.abstractmethod
    async def change_one(self, route_hash: str, **fields) -> Route:
        '''
        Change one route by id with given fields to change, returning changed route

        db.change_one(route.id, move_from="Lviv")
        '''
        ...
    
    @abc.abstractmethod
    async def remove_many(self, _filter: dict[str, typing.Any] = {}):
        '''
        Remove many routes from the database with the given filter
        '''
        ...
    
    @abc.abstractmethod
    async def change_many(self, _filter: dict[str, typing.Any] = {}, **fields) -> list[Route]:
        '''
        Change many routes by filter with given fields to change, returning changed routes
        '''
        ...
