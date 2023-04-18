import os
import typing
import asyncio

from dotenv import load_dotenv
from src.interfaces import IRouteDataBase
from src.logic.entities import Route
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

class MongoRouteDataBase(IRouteDataBase):
    def __init__(self):
        client = AsyncIOMotorClient(os.environ.get('MONGO_URI'))
        dbname = client['Bus']
        self._db = dbname['Cluster0']

    async def get_all(self, _filter: dict[str, typing.Any] = {}) -> list[Route]:
        routes = await self._db.find(_filter)

        return [Route(**route) for route in routes]

    async def get_one(self, route_hash: str) -> Route:
        return Route(**(await self._db.find_one({"id": route_hash})))

    async def add_one(self, route: Route):
        await self._db.insert_one(route.dict())
    
    async def remove_one(self, route_hash: str):
        await self._db.delete_one({"id": route_hash})

    async def change_one(self, route_hash: str, **fields) -> Route:
        await self._db.update_one({"id": route_hash}, fields)
    
    async def remove_many(self, _filter: dict[str, typing.Any] = {}):
        await self._db.delete_many(_filter)
    
    async def change_many(self, _filter: dict[str, typing.Any] = {}, **fields) -> list[Route]:
        await self._db.update_many(_filter, fields)
    
    def __len__(self):
        return 0