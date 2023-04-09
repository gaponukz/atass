import pydantic
import datetime
import typing
import uuid

HashId: typing.TypeAlias = str
PricesSchema = dict[HashId, dict[HashId, int]]
LangCode = typing.Literal['ua', 'en', 'pl']
MultiLanguages = dict[LangCode, str]

_DatetimeObject = typing.TypedDict('_DatetimeObject', {
    'from': datetime.datetime,
    'to': datetime.datetime
})

enpty_languages: MultiLanguages = { code: "" for code in typing.get_args(LangCode) }

class User(pydantic.BaseModel):
    '''
    Base user struct used to describe soft user (even not authed)
    '''
    first_name: str
    last_name: str
    phone_number: str
    email_address: str | None = None

class AuthorizedUser(User):
    """
    Authorized user entity, used for authentication
    """
    is_authenticated: bool = False
    password_hash: str | None = None
    id: HashId = str(uuid.uuid4())

class Place(pydantic.BaseModel):
    '''
    Place struct is like a point in Earth
    '''
    country: str
    city: str
    street: str
    map_url: str | None = None
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
    """
    User who bought the ticket
    """
    moving_from: Spot
    moving_towards: Spot
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

class ShortRoute(pydantic.BaseModel):
    """
    Describe routes fammily tittle
    """
    move_from: Place
    move_to: Place
    count: int

class SpotProxy(pydantic.BaseModel):
    """
    Used as proxy object for Spot for RouteProxy
    """
    place: Place
    from_start: int
    id: HashId

class RouteProxy(pydantic.BaseModel):
    """
    DTO for creating new routes, used as proxy object for Route object
    """
    move_from: SpotProxy
    move_to: SpotProxy
    passengers_number: int
    sub_spots: list[SpotProxy]
    prices: PricesSchema
    description: MultiLanguages
    rules: MultiLanguages
    transportation_rules: MultiLanguages
    id: HashId
