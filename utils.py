import typing
from functools import wraps

def catch_exceptions(function: typing.Callable):
    @wraps(function)
    async def wrapper(*args, **kwargs):
        try:
            return await function(*args, **kwargs)
        
        except Exception as error:
            return {
                "status": 500,
                "message": f"{error.__class__.__name__}: {error}",
                "body": None
            }

    return wrapper
