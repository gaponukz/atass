import os
import typing
import pymongo
import pydantic

from dotenv import load_dotenv
from src.interfaces import IRouteDataBase
from src.logic.entities import Route

load_dotenv()

class MongoRouteDataBase(IRouteDataBase):
    def __init__(self):
        client = pymongo.MongoClient(os.environ.get('MONGO_URI'))
        dbname = client['Bus']
        self._db = dbname['Cluster0']

    async def get_all(self, _filter: dict[str, typing.Any] = {}) -> list[Route]:
        routes = self._db.find(self._normalize(_filter))

        return [Route(**route) for route in routes]

    async def get_one(self, route_hash: str) -> Route:
        return Route(**(self._db.find_one({"id": route_hash})))

    async def add_one(self, route: Route):
        self._db.insert_one(route.dict())
    
    async def remove_one(self, route_hash: str):
        self._db.delete_one({"id": route_hash})

    async def change_one(self, route_hash: str, **fields) -> Route:
        self._db.update_one({"id": route_hash}, {"$set": self._normalize(fields)}, True)
    
    async def remove_many(self, _filter: dict[str, typing.Any] = {}):
        self._db.delete_many(self._normalize(_filter))
    
    async def change_many(self, _filter: dict[str, typing.Any] = {}, **fields) -> list[Route]:
        self._db.update_many(self._normalize(_filter), {"$set": self._normalize(fields)})
    
    def __len__(self):
        return self._db.count_documents({})

    def _normalize(self, pydantic_object: dict[str, pydantic.BaseModel]) -> dict:
        for key, value in pydantic_object.items():
            if isinstance(value, pydantic.BaseModel):
                pydantic_object[key] = value.dict()
            
        return pydantic_object
