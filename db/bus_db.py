import typing
import abc

from .utils.entities import Bus

class IBusDataBase(abc.ABC):
    '''
    Abstract base class for buses databases
    '''
    @abc.abstractmethod
    def get_all(self, _filter: typing.Callable[[Bus], bool] = lambda _: True) -> list[Bus]:
        '''
        Fetch all buses from the database with the given filter
        '''
        pass

    @abc.abstractmethod
    def get_one(self, bus_hash: str) -> Bus:
        '''
        Return one bus from the database
        @param bus_hash: The bus id
        '''
        pass

    @abc.abstractmethod
    def add_one(self, bus: Bus):
        '''
        Add one bus to the database
        '''
        pass
    
    @abc.abstractmethod
    def remove_one(self, bus_hash: str):
        '''
        Remove one bus from the database
        @param bus_hash: The bus id
        '''
        pass
    
    @abc.abstractmethod
    def change_one(self, bus_hash: str, **fields) -> Bus:
        '''
        Change one bus by id with given fields to change, returning changed bus

        db.change_one(bus.id, color="red")
        '''
        pass
    
    @abc.abstractmethod
    def __len__(self):
        pass
