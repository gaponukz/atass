import typing

class Response(typing.TypedDict):
    status: typing.Literal[200, 404, 500]
    message: str
    body: typing.Any
