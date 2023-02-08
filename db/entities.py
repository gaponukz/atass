import dataclasses
import inspect
import datetime
import uuid

from errors import *
from languages import MultiLanguages, enpty_languages
from typing import Literal

HashId = str
PricesSchema = dict[HashId, list[dict[Literal["place", "price"], HashId | int]]]

class DictAble(object):
    @classmethod
    def from_dict(cls, dict_obj):
        new_object = {}

        for key, value in dict_obj.items():
            dataclasses.is_dataclass
            if key in inspect.signature(cls).parameters:
                ThisClass = cls.__annotations__[key]
                
                if dataclasses.is_dataclass(ThisClass):
                    new_object[key] = ThisClass.from_dict(value)
                
                else:
                    new_object[key] = value
        
        return cls(**new_object)

    def to_dict(self):
        dictionary = dataclasses.asdict(self)
        dictionary.update({"id": self.id})

        return dictionary
    
    def __dict__(self):
        return self.to_dict()

@dataclasses.dataclass
class Place(DictAble):
    country: str
    city: str
    street: str
    map_url: str = None
    id: HashId = dataclasses.field(default_factory = lambda: str(uuid.uuid4()))

@dataclasses.dataclass
class Spot(DictAble):
    '''
    Spot is a class representing stop or final point for Route\n\n
    Example:
        `Spot(place=Place(...), date=datetime.datetime(2023, 1, 21, 14, 0))`\n\n
        So we know that we have a stop at 2023-01-21 14:00:00 in `place` and it costs 800 from start point\n
    '''
    place: Place
    date: datetime.datetime
    is_active: bool = True
    description: MultiLanguages = dataclasses.field(default_factory = lambda: enpty_languages.copy())
    id: HashId = dataclasses.field(default_factory = lambda: str(uuid.uuid4()))

    def archive(self):
        self.is_active = False
    
    def unarchive(self):
        self.is_active = True

@dataclasses.dataclass
class Passenger(DictAble):
    first_name: str
    last_name: str
    phone_number: str
    password_hash: str = None
    current_spot: Spot = None
    id: HashId = dataclasses.field(default_factory = lambda: str(uuid.uuid4()))

@dataclasses.dataclass
class Route(DictAble):
    '''
    Main class to describe the route.\n
    On created passengers and sub_spots is enpty, you will add them later.\n
    `_passengers_number` - limit of route passengers, can be changed very often\n
    `description` - multi languages description of the route
    '''
    move_from: Spot
    move_to: Spot
    passengers_number: int
    sub_spots: list[Spot]
    is_active: bool = True
    prices: PricesSchema = dataclasses.field(default_factory = lambda: {} )
    passengers: list[Passenger] = dataclasses.field(default_factory = lambda: [])
    description: MultiLanguages = dataclasses.field(default_factory = lambda: enpty_languages.copy() )
    id: HashId = dataclasses.field(default_factory = lambda: str(uuid.uuid4()))
    # TODO: provide a prices functionality
    
    def add_sub_spot(self, spot: Spot):
        self.sub_spots.append(spot)
    
    def remove_sub_spot(self, spot_id: HashId):
        for spot in self.sub_spots:
            if spot.id == spot_id:
                self.sub_spots.remove(spot)
                return
        
        raise SpotNotFoundError()

    def add_passenger(self, passenger: Passenger):
        if len(self.passengers) == self.passengers_number:
            raise RouteBusIsFullError(self.passengers_number)

        self.passengers.append(passenger)
    
    def remove_passenger(self, passenger_id: HashId):
        for passenger in self.passengers:
            if passenger.id == passenger_id:
                self.passengers.remove(passenger)
                return
        
        raise PassengerNotFoundError()

    def set_passenger_number(self, max_passengers_number: int):
        if len(self.passengers) > max_passengers_number:
            raise CannotKillPassengersError(len(self.passengers))
        
        self.passengers_number = max_passengers_number

    def archive(self):
        self.is_active = False
    
    def unarchive(self):
        self.is_active = True
