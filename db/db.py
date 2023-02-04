import typing
import abc

from entities import Route

class IRouteDataBase(abc.ABC):
    '''
    Abstract base class for routes databases
    '''
    @abc.abstractmethod
    def get_all(self, _filter: typing.Callable[[Route], bool] = lambda _: True) -> list[Route]:
        '''
        Fetch all routes from the database with the given filter
        '''
        pass

    @abc.abstractmethod
    def get_one(self, route_hash: str) -> Route:
        '''
        Return one route from the database
        @param route_hash: The route id
        '''
        pass

    @abc.abstractmethod
    def add_one(self, route: Route):
        '''
        Add one route to the database
        '''
        pass
    
    @abc.abstractmethod
    def remove_one(self, route_hash: str):
        '''
        Remove one route from the database
        @param route_hash: The route id
        '''
        pass
    
    @abc.abstractmethod
    def change_one(self, route_hash: str, **fields) -> Route:
        '''
        Change one route by id with given fields to change, returning changed route

        db.change_one(route.id, move_from="Lviv")
        '''
        pass
    
    @abc.abstractmethod
    def remove_many(self, _filter: typing.Callable[[Route], bool]):
        '''
        Remove many routes from the database with the given filter
        '''
        pass
    
    @abc.abstractmethod
    def change_many(self, _filter: typing.Callable[[Route], bool], **fields) -> list[Route]:
        '''
        Change many routes by filter with given fields to change, returning changed routes
        '''
        pass
    
    @abc.abstractmethod
    def __len__(self):
        pass
