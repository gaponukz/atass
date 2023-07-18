import pydantic
from src.business import entities

class AddRoutesDTO(pydantic.BaseModel):
    route_prototype: entities.RoutePrototype
    datetimes: list[entities.DatetimeObject]

class ChangeUserDTO(pydantic.BaseModel):
    route_id: entities.HashId
    fields: dict[str, object]
