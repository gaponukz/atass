import typing
import datetime
import pydantic
import logic.entities

T = typing.TypeVar("T")

class Response(pydantic.BaseModel, typing.Generic[T]):
    status: typing.Literal[200, 404, 500] = 200
    message: str = "Success"
    body: T

_DatetimeObject = typing.TypedDict('_DatetimeObject', {
    'from': datetime.datetime,
    'to': datetime.datetime
})

class AddRoutesDTO(pydantic.BaseModel):
    route_prototype: logic.entities.RouteProxy
    dates: list[_DatetimeObject]
