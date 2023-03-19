import os
import typing

from functools import wraps
from fastapi import Header, HTTPException

# TODO: make it possible to work
def admin_authentication_required(function: typing.Callable) -> typing.Callable:
    @wraps
    async def wrapper(*args, adminKey: str = Header(...), **kwargs):
        if adminKey != os.environ['ADMIN_PASSWORD_KEY']:
            raise HTTPException(status_code=403, detail="Not authorized")

        return await function(*args, **kwargs)

    return wrapper

