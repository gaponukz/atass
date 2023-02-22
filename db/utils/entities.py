import dataclasses
import datetime
import uuid

from .utils import *
from .errors import *
from .languages import MultiLanguages, enpty_languages

HashId = str
PricesSchema = dict[HashId, dict[HashId, int]]

@enforce_types
@dataclasses.dataclass
class Bus(DictAble):
    '''
    NOTE: Bus struck used id database not in routes logic
    Maybe in future for image: str -> list[str] (images)
    '''
    model: str
    image: str
    description: MultiLanguages = dataclasses.field(default_factory = lambda: enpty_languages.copy() )

@enforce_types
@dataclasses.dataclass
class User(DictAble):
    '''
    Base user struct used to describe soft user (even not authed)
    '''
    first_name: str
    last_name: str
    phone_number: str
    email_address: str = None

    def __eq__(self, other: 'User'):
        return (
            self.first_name == other.first_name
            and self.last_name == other.last_name
            and self.phone_number == other.phone_number
        )

@enforce_types
@dataclasses.dataclass
class AuthorizedUser(User):
    is_authenticated: bool = False
    password_hash: str = None
    id: HashId = dataclasses.field(default_factory = lambda: str(uuid.uuid4()))

@enforce_types
@dataclasses.dataclass
class Place(DictAble):
    '''
    Place struct is like a point in Earth
    '''
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
    id: HashId = dataclasses.field(default_factory = lambda: str(uuid.uuid4()))

    def archive(self):
        self.is_active = False
    
    def unarchive(self):
        self.is_active = True

@enforce_types
@dataclasses.dataclass
class Passenger(User):
    moving_from: Spot = None
    moving_towards: Spot = None
    id: HashId = dataclasses.field(default_factory = lambda: str(uuid.uuid4()))

@enforce_types
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
    rules: MultiLanguages = dataclasses.field(default_factory = lambda: enpty_languages.copy() )
    transportation_rules: MultiLanguages = dataclasses.field(default_factory = lambda: enpty_languages.copy() )
    id: HashId = dataclasses.field(default_factory = lambda: str(uuid.uuid4()))

    def __post_init__(self):
        self.prices[self.move_from.id] = {}
    
    def add_sub_spot(self, spot: Spot):
        self.prices[spot.id] = {}
        self.sub_spots.append(spot)
    
    def remove_sub_spot(self, spot_id: HashId):
        for spot in self.sub_spots:
            if spot.id == spot_id:
                self.sub_spots.remove(spot)
                self.prices.pop(spot_id, None)
                return
        
        raise SpotNotFoundError()

    def set_spot_price(self, spot_from: Spot, spot_to: Spot, price: int):
        if spot_from.date < spot_to.date:
            self.prices[spot_from.id][spot_to.id] = price
        
        else:
            self.prices[spot_to.id][spot_from.id] = price

    def add_passenger(self, passenger: Passenger, moving_from: Spot = None, moving_towards: Spot = None):
        # TODO: take into account bus boarding and disembarking
        # NOTE: all logic in __has_enough_seats function
        
        if len(self.passengers) == self.passengers_number: # this is not correct
            raise RouteBusIsFullError(self.passengers_number)

        if not moving_from:
            passenger.moving_from = self.move_from
        
        if not moving_towards:
            passenger.moving_towards = self.move_to
        
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
    
    def __has_enough_seats_for(self, passenger: Passenger) -> bool:
        # TODO: need to implement
        current_bus_seats = 0

        all_spots = self.sub_spots.copy() + [self.move_to, self.move_from]

        for i in range(len(all_spots)):
            for j in range(i + 1, len(all_spots)):
                move_from = all_spots[i]
                move_to = all_spots[j]

        return True

@enforce_types
@dataclasses.dataclass
class Path(DictAble):
    '''
    Path struct is describe path between spots of some route(s).
    '''
    move_from: Spot
    move_to: Spot
    price: int
    root_route_id: HashId
    passengers: list[Passenger] = dataclasses.field(default_factory = lambda: [])
    id: HashId = dataclasses.field(default_factory = lambda: str(uuid.uuid4()))
