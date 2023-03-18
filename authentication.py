from fastapi import Header, HTTPException
from typing import Any, Callable
from functools import wraps

def admin_authentication_required(function: Callable[..., Any]) -> Callable[..., Any]:
    @wraps(function)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        api_key: str = Header(None)
        
        if api_key not in kwargs or kwargs[api_key] != "my_admin_api_key":
            raise HTTPException(status_code=403, detail="Not authorized")
        
        return function(*args, **kwargs)
    
    return wrapper
