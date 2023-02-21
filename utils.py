from flask import request, abort
import typing

def auth_required(function: typing.Callable) -> typing.Callable:
    def decorated(*args, **kwargs) -> typing.Callable:
        if request.headers.get('password') == '123':
            return function(*args, **kwargs)

        abort(401, description='Unauthorized')

    return decorated
