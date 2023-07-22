import pydantic
import datetime
import typing
import uuid
import typing_extensions

HashId: typing.TypeAlias = str
PricesSchema = dict[HashId, dict[HashId, int]]
LangCode = typing.Literal['ua', 'en', 'pl']
MultiLanguages = dict[LangCode, str]

DatetimeObject = typing_extensions.TypedDict('DatetimeObject', {
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
    map_url: pydantic.HttpUrl | None = None
    id: str | None = None

    def __init__(self, **data):
        if 'id' not in data:
            data['id'] = str(uuid.uuid4())

        super().__init__(**data)

class Spot(pydantic.BaseModel):
    place: Place
    date: datetime.datetime
    is_active: bool = True
    id: HashId = str(uuid.uuid4())

    def __init__(self, **data):
        if 'id' not in data:
            data['id'] = str(uuid.uuid4())
            
        super().__init__(**data)

class Passenger(User):
    moving_from_id: HashId
    moving_towards_id: HashId
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
    id: HashId = str(uuid.uuid4())

class ShortRoute(pydantic.BaseModel):
    move_from: Place
    move_to: Place
    count: int

class SpotTemplate(pydantic.BaseModel):
    place: Place
    from_start: int
    id: HashId

class RoutePrototype(_RouteBase):
    move_from: SpotTemplate
    move_to: SpotTemplate
    sub_spots: list[SpotTemplate]
