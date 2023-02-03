import dataclasses
import inspect
import datetime
import hashlib

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
class Passenger(DictAble):
    first_name: str
    last_name: str
    phone_number: str

    @property
    def id(self) -> str:
        return hashlib.sha256((
            self.first_name \
            + self.last_name \
            + self.phone_number \
        ).encode('utf-8')).hexdigest()

@dataclasses.dataclass
class Driver(DictAble):
    first_name: str
    last_name: str
    phone_number: str

    @property
    def id(self) -> str:
        return hashlib.sha256((
            self.first_name \
            + self.last_name \
            + self.phone_number\
        ).encode('utf-8')).hexdigest()

@dataclasses.dataclass
class Spot(DictAble):
    name: str
    price_from_start: int
    date: datetime.datetime

    @property
    def id(self) -> str:
        return hashlib.sha256((
            self.name \
            + str(self.date) \
            + str(self.price_from_start) \
        ).encode('utf-8')).hexdigest()

@dataclasses.dataclass
class Route(DictAble):
    move_from: str
    move_to: str
    date: datetime.datetime
    travel_time: int
    price: int
    passengers_number: int
    spots: list[Spot]

    @property
    def id(self) -> str:
        return hashlib.sha256((
            self.move_from \
            + self.move_to \
            + str(self.date)\
        ).encode('utf-8')).hexdigest()

