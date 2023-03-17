from fastapi import FastAPI
from logic.entities import User

app = FastAPI() # uvicorn server:app --reload

@app.get("/get_user")
def read_root(user_id: str) -> str:
    return {
        "id" : user_id,
        "user": User(
            first_name = "Adam",
            last_name = "And",
            phone_number = "38063856332",
            email_address = "user@gmail.com"
        )
    }

