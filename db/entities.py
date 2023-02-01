import dataclasses
import datetime
import hashlib

@dataclasses.dataclass
class Passenger:
    first_name: str
    last_name: str
    phone_number: str

    @property
    def id(self) -> str:
        return hashlib.sha256((self.first_name + self.last_name + self.phone_number).encode('utf-8')).hexdigest()

@dataclasses.dataclass
class Driver:
    first_name: str
    last_name: str
    phone_number: str

    @property
    def id(self) -> str:
        return hashlib.sha256((self.first_name + self.last_name + self.phone_number).encode('utf-8')).hexdigest()

@dataclasses.dataclass
class Route:
    move_from: str
    move_to: str
    date: datetime.datetime
    travel_time: int
    driver: Driver

    @property
    def id(self) -> str:
        return hashlib.sha256((self.move_from + self.move_to + str(self.date)).encode('utf-8')).hexdigest()
