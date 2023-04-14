import pydantic
import datetime
import typing
import uuid

HashId: typing.TypeAlias = str
PricesSchema = dict[HashId, dict[HashId, int]]
LangCode = typing.Literal['ua', 'en', 'pl']
MultiLanguages = dict[LangCode, str]

DatetimeObject = typing.TypedDict('DatetimeObject', {
    'from': datetime.datetime,
    'to': datetime.datetime
})

enpty_languages: MultiLanguages = { code: "" for code in typing.get_args(LangCode) }

class _RouteBase(pydantic.BaseModel):
    passengers_number: int
    is_active: bool = True
    prices: PricesSchema = {}
    description: MultiLanguages = enpty_languages
    rules: MultiLanguages = enpty_languages
    transportation_rules: MultiLanguages = enpty_languages
    id: HashId = str(uuid.uuid4())

class User(pydantic.BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    email_address: str | None = None

class AuthorizedUser(User):
    is_authenticated: bool = False
    password_hash: str | None = None
    id: HashId = str(uuid.uuid4())

class Place(pydantic.BaseModel):
    country: str
    city: str
    street: str
    map_url: str | None = None
    id: HashId = str(uuid.uuid4())

class Spot(pydantic.BaseModel):
    place: Place
    date: datetime.datetime
    is_active: bool = True
    id: HashId = str(uuid.uuid4())

class Passenger(User):
    moving_from: Spot
    moving_towards: Spot
    id: HashId = str(uuid.uuid4())

class Route(_RouteBase):
    move_from: Spot
    move_to: Spot
    sub_spots: list[Spot] = []
    passengers: list[Passenger] = []

    class Config:
        extra = pydantic.Extra.ignore

class Path(pydantic.BaseModel):
    move_from: Spot
    move_to: Spot
    price: int
    root_route_id: HashId
    passengers: list[Passenger] = []
    id: HashId = str(uuid.uuid4())

class ShortRoute(pydantic.BaseModel):
    move_from: Place
    move_to: Place
    count: int

class SpotTemplate(pydantic.BaseModel):
    place: Place
    from_start: int
    id: HashId

class RouteTemplate(_RouteBase):
    move_from: SpotTemplate
    move_to: SpotTemplate
    sub_spots: list[SpotTemplate]
