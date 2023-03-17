from fastapi import FastAPI

import logic.functions
import logic.entities
from db.json_route_db import JsonRouteDataBase

app = FastAPI() # uvicorn server:app --reload
db = JsonRouteDataBase()

@app.get("/get_unique_routes")
def unique_routes_page() -> dict[str, logic.entities.ShortRoute]:
    return logic.functions.get_unique_routes(db.get_all())

@app.get("/get_routes_family")
def get_routes_family_page(move_from_city: str, move_to_city: str) -> list[logic.entities.Route]:
    return db.get_all(lambda route: route.move_from.place.city == move_from_city and route.move_to.place.city == move_to_city)

@app.get("get_route")
def get_route_page(route_id: logic.entities.HashId) -> logic.entities.Route:
    return db.get_one(route_id)
