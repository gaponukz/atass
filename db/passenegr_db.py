import typing
import abc

from utils.entities import Passenger

class IPassengerDatabase(abc.ABC):
    '''
    Abstract base class for passengers databases
    '''
    @abc.abstractmethod
    def get_all(self, _filter: typing.Callable[[Passenger], bool] = lambda _: True) -> list[Passenger]:
        '''
        Fetch all passengers from the database with the given filter
        '''
        pass

    @abc.abstractmethod
    def get_one(self, passenger_id: str) -> Passenger:
        '''
        Return one passenger from the database
        @param passenger_id: The passenger id
        '''
        pass
    
    @abc.abstractmethod
    def add_one(self, passenger: Passenger):
        '''
        Add one non registered passenger to the database.
        '''
        pass
    
    @abc.abstractmethod
    def register_one(self, passenger: Passenger, password_hash: str):
        '''
        Register passenger.
        NOTE: if passenger not in database, we will add him by calling .add_one(passenger)
        '''
        pass
    
    @abc.abstractmethod
    def login(self, phone: str, password_hash: str) -> Passenger:
        '''
        Check if user exist, throw error if passenger is not exist else return Passenger entity
        '''
        pass
    
    @abc.abstractmethod
    def remove_one(self, passenger_id: str):
        '''
        Remove one passenger from the database
        '''
        pass

    @abc.abstractmethod
    def __len__(self):
        pass
