import os

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

def admin_required(api_key: str = Depends(OAuth2PasswordBearer(tokenUrl="token"))):
    if api_key != os.environ.get('ADMIN_PASSWORD_KEY'):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Forbidden"
        )
