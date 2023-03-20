import typing
import pydantic

T = typing.TypeVar("T")

class Response(pydantic.BaseModel, typing.Generic[T]):
    status: typing.Literal[200, 404, 500] = 200
    message: str = "Success"
    body: T
