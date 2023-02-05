import dataclasses
import inspect
import datetime
import hashlib

from errors import *

class DictAble(object):
    @classmethod
    def from_dict(cls, dict_obj):      
        return cls(**{
            key: value for key, value in dict_obj.items() 
            if key in inspect.signature(cls).parameters
        })

    def to_dict(self):
        dictionary = dataclasses.asdict(self)
        dictionary.update({"id": self.id})

        return dictionary
    
    def __dict__(self):
        return self.to_dict()

@dataclasses.dataclass
class Spot(DictAble):
    '''
    Spot is a class representing stop or final point for Route 
    NOTE: If `price_from_start` if zero it is start point

    Example:
        `Spot(name="Lviv", price_from_start=800, date=datetime.datetime(2023, 1, 21, 14, 0))`

        So we know that we have a stop at 2023-01-21 14:00:00 in Lviv and it costs 800 from start point
    '''
    name: str
    date: datetime.datetime
    is_active: bool = True
    price_from_start: int = 0

    def archive(self):
        self.is_active = False
    
    def unarchive(self):
        self.is_active = True

    @property
    def id(self) -> str:
        return hashlib.sha256((
            self.name \
            + str(self.date)
        ).encode('utf-8')).hexdigest()

@dataclasses.dataclass
class Passenger(DictAble):
    first_name: str
    last_name: str
    phone_number: str
    spot: Spot = None

    @property
    def id(self) -> str:
        return hashlib.sha256((
            self.first_name \
            + self.last_name \
            + self.phone_number \
        ).encode('utf-8')).hexdigest()

@dataclasses.dataclass
class Route(DictAble):
    move_from: Spot
    move_to: Spot
    _passengers_number: int
    sub_spots: list[Spot]
    passengers: list[Passenger]

    def app_sub_spot(self, spot: Spot):
        self.sub_spots.append(spot)

    def add_passenger(self, passenger: Passenger):
        if len(self.passengers) == self.passengers_number:
            raise RouteBusIsFullError(self.passengers_number)

        self.passengers.append(passenger)
    
    def remove_passenger(self, passenger_id: str):
        for passenger in self.passengers:
            if passenger.id == passenger_id:
                self.passengers.remove(passenger)
                return
        
        raise PassengerNotFoundError()
    
    @property
    def passengers_number(self):
        return self._passengers_number

    @passengers_number.setter
    def passenger_number(self, max_passengers_number: int):
        if len(self.passengers) > max_passengers_number:
            raise CannotKillPassengersError(len(self.passengers))
        
        self._passengers_number = max_passengers_number

    @property
    def id(self) -> str:
        return hashlib.sha256((
            self.move_from.id \
            + self.move_to.id
        ).encode('utf-8')).hexdigest()
