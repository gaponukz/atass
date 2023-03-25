import typing
import datetime
import pydantic
import logic.entities

T = typing.TypeVar("T")

class Response(pydantic.BaseModel, typing.Generic[T]):
    status: typing.Literal[200, 404, 500] = 200
    message: str = "Success"
    body: T

class AddRoutesDTO(pydantic.BaseModel):
    root_route: logic.entities.Route
    dates: list[datetime.datetime]
