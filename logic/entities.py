import pydantic
import datetime
import typing
import uuid

HashId = str
PricesSchema = dict[HashId, dict[HashId, int]]
LangCode = typing.Literal['ua', 'en', 'pl']
MultiLanguages = dict[LangCode, dict[str, str]]

enpty_languages: MultiLanguages = { "en": {}, "pl": {}, "ua": {} }

class User(pydantic.BaseModel):
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

class AuthorizedUser(User):
    is_authenticated: bool = False
    password_hash: str = None
    id: HashId = str(uuid.uuid4())

class Place(pydantic.BaseModel):
    '''
    Place struct is like a point in Earth
    '''
    country: str
    city: str
    street: str
    map_url: str = None
    id: HashId = str(uuid.uuid4())

class Spot(pydantic.BaseModel):
    '''
    Spot is a class representing stop or final point for Route\n\n
    Example:
        `Spot(place=Place(...), date=datetime.datetime(2023, 1, 21, 14, 0))`\n\n
        So we know that we have a stop at 2023-01-21 14:00:00 in `place` and it costs 800 from start point\n
    '''
    place: Place
    date: datetime.datetime
    is_active: bool = True
    id: HashId = str(uuid.uuid4())

class Passenger(User):
    moving_from: Spot = None
    moving_towards: Spot = None
    id: HashId = str(uuid.uuid4())

class Route(pydantic.BaseModel):
    '''
    Main class to describe the route.\n
    On created passengers and sub_spots is enpty, you will add them later.\n
    `_passengers_number` - limit of route passengers, can be changed very often\n
    `description` - multi languages description of the route
    '''
    move_from: Spot
    move_to: Spot
    passengers_number: int
    sub_spots: list[Spot] = []
    is_active: bool = True
    prices: PricesSchema = {}
    passengers: list[Passenger] = []
    description: MultiLanguages = enpty_languages
    rules: MultiLanguages = enpty_languages
    transportation_rules: MultiLanguages = enpty_languages
    id: HashId = str(uuid.uuid4())

    def __post_init__(self):
        self.prices[self.move_from.id] = {}

class Path(pydantic.BaseModel):
    '''
    Path struct is describe path between spots of some route(s).
    '''
    move_from: Spot
    move_to: Spot
    price: int
    root_route_id: HashId
    passengers: list[Passenger] = []
    id: HashId = str(uuid.uuid4())

class ShortRoute(typing.TypedDict):
    move_from: dict
    move_to: dict
    count: int
