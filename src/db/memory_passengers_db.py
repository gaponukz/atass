import typing

from src.logic.errors import UserNotFoundError
from src.interfaces import IPassengerDatabase
from src.logic.entities import AuthorizedUser, HashId

class MemoryPassengerDatabase(IPassengerDatabase):
    def __init__(self):
        self.passengers: dict[HashId, AuthorizedUser] = {}

    def get_all(self, _filter: typing.Callable[[AuthorizedUser], bool] = lambda _: True) -> list[AuthorizedUser]:
        return list(filter(_filter, self.passengers.values()))

    def get_one(self, passenger_id: str) -> AuthorizedUser:
        return self.passengers.get(passenger_id)

    def add_one(self, passenger: AuthorizedUser):
        self.passengers[passenger.id] = passenger

    def register_one(self, passenger: AuthorizedUser, password_hash: str):
        passenger.is_authenticated = True
        passenger.password_hash = password_hash

        self.add_one(passenger)
        
    def login(self, phone: str, password_hash: str) -> AuthorizedUser:
        maybe_passengers = self.get_all(lambda _passenger: _passenger.phone_number == phone)

        if maybe_passengers:
            passenger = maybe_passengers[0]
            if passenger.password_hash == password_hash:
                return passenger
        
        raise UserNotFoundError()

    def remove_one(self, passenger_id: str):
        self.passengers.pop(passenger_id)

    def __len__(self):
        return len(self.passengers)
