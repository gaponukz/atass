import os
import sys
import random
import unittest
import datetime

sys.path.insert(0, os.path.abspath('.'))

from src.logic.entities import *
from src.logic.errors import *
from src.db.json_route_db import JsonRouteDataBase
from src.db.memory_route_db import MemoryRouteDataBase

db = JsonRouteDataBase()

def generate_random_spot() -> Spot:
    countries = ["USA", "Canada", "France", "Germany", "Japan", "China"]
    cities = ["New York", "Los Angeles", "Paris", "Berlin", "Tokyo", "Shanghai"]
    streets = ["Main Street", "Broadway", "Champs-Élysées", "Friedrichstraße", "Ginza", "Nanjing Road"]
    map_urls = ["https://google.com/maps", "https://apple.com/maps", "https://mapbox.com"]
    is_active = random.choice([True, False])

    place = Place(
        country=random.choice(countries),
        city=random.choice(cities),
        street=random.choice(streets),
        map_url=random.choice(map_urls)
    )

    date = datetime.datetime.now() - datetime.timedelta(days=random.randint(0, 30))

    return Spot(place=place, date=date, is_active=is_active)

class DataBaseTests(unittest.IsolatedAsyncioTestCase):
    async def test_adding_getting_routes(self):
        route1 = Route(
            move_from=(test_spot1 := generate_random_spot()),
            move_to=generate_random_spot(),
            passengers_number=10
        )

        route2 = Route(
            move_from=(test_spot2 := generate_random_spot()),
            move_to=generate_random_spot(),
            passengers_number=10
        )

        route3 = Route(
            move_from=generate_random_spot(),
            move_to=generate_random_spot(),
            passengers_number=10
        )

        await db.add_one(route1)
        self.assertEqual(len(db), 1)
        await db.add_one(route2)
        self.assertEqual(len(db), 2)
        await db.add_one(route3)
        self.assertEqual(len(db), 3)

        self.assertEqual(len(db), len(await db.get_all()))

        flitered_routes = await db.get_all(lambda route: route.move_from == test_spot1)
        self.assertEqual(len(flitered_routes), 1)

        flitered_routes = await db.get_all(lambda route: route.move_from == test_spot2)
        self.assertEqual(len(flitered_routes), 1)

        self.assertEqual(route2.id, (await db.get_one(route2.id)).id)

    async def test_removing_all(self):
        await db.remove_many(lambda _: True)
        
        self.assertEqual(len(db), 0)

    async def test_changings(self):
        route1 = Route(
            move_from=generate_random_spot(),
            move_to=generate_random_spot(),
            passengers_number=10
        )

        route2 = Route(
            move_from=generate_random_spot(),
            move_to=generate_random_spot(),
            passengers_number=10
        )

        route3 = Route(
            move_from=generate_random_spot(),
            move_to=generate_random_spot(),
            passengers_number=10
        )

        await db.change_many(lambda _: True, passengers_number=15)

        all_routes = await db.get_all()

        self.assertTrue(all(_route.passengers_number == 15 for _route in all_routes))

        await db.change_one(route1.id, move_to=(new_spot := generate_random_spot()))
        self.assertEqual(new_spot, (await db.get_one(route1.id)).move_to)

        await db.change_one(route2.id, move_to=(new_spot := generate_random_spot()))
        self.assertEqual(new_spot, (await db.get_one(route2.id)).move_to)

        await db.change_one(route3.id, move_to=(new_spot := generate_random_spot()))
        self.assertEqual(new_spot, (await db.get_one(route3.id)).move_to)

        await db.change_many(lambda _: True, move_to=(new_spot := generate_random_spot()))
        all_routes = await db.get_all()
        self.assertTrue(all(_route.move_to == new_spot for _route in all_routes))

    async def test_removing(self):
        routes = await db.get_all()
        lenght = 3

        for route in routes:
            self.assertEqual(len(db), lenght)
            await db.remove_one(route.id)

            lenght -= 1

if __name__ == "__main__":
    unittest.main()
