import typing
import pydantic
from src.logic import entities

T = typing.TypeVar("T")

class Response(pydantic.BaseModel, typing.Generic[T]):
    status: typing.Literal[200, 404, 500] = 200
    message: str = "Success"
    body: T

class AddRoutesDTO(pydantic.BaseModel):
    route_prototype: entities.RouteProxy
    datetimes: list[entities._DatetimeObject]
