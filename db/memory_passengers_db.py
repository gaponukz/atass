import typing

from passenegr_db import IPassengerDatabase
from utils.entities import Passenger, HashId

class MemoryPassengerDatabase(IPassengerDatabase):
    def __init__(self):
        self.passengers: dict[HashId, Passenger] = {}

    def get_all(self, _filter: typing.Callable[[Passenger], bool] = lambda _: True) -> list[Passenger]:
        return list(filter(_filter, self.passengers.items()))

    def get_one(self, passenger_id: str) -> Passenger:
        return self.passengers.get(passenger_id)

    def add_one(self, passenger: Passenger):
        self.passengers[passenger.id] = passenger

    def register_one(self, passenger: Passenger, password_hash: str):
        passenger.is_authenticated = True
        passenger.password_hash = password_hash

        self.add_one(passenger)
        
    def login(self, phone: str, password_hash: str) -> Passenger:
        maybe_passengers = self.get_all(lambda _passenger: _passenger.phone_number == phone)

        if maybe_passengers:
            passenger = maybe_passengers[0]
            if passenger.password_hash == password_hash:
                return passenger

    def remove_one(self, passenger_id: str):
        self.passengers.pop(passenger_id)

    def __len__(self):
        return len(self.passengers)
