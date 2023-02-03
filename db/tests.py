import unittest
import datetime
from entities import Route, Spot
from memory_db import MemoryRouteDataBase
from json_db import JsonRouteDataBase

class DataBasesTests(unittest.TestCase):
    def memory_db_test(self):
        route = Route(
            move_from = "Kiyv",
            move_to = "Warsaw",
            date = datetime.datetime.now(),
            travel_time = 100,
            price = 1200,
            passengers_number = 20,
            spots = [
                Spot(name="Bucha", price_from_start=100, date=datetime.datetime.now()),
                Spot(name="Rivne", price_from_start=500, date=datetime.datetime.now()),
                Spot(name="Lutsk", price_from_start=600, date=datetime.datetime.now()),
                Spot(name="Lviv", price_from_start=800, date=datetime.datetime.now())

            ]
        )

        db = MemoryRouteDataBase()

        db.add_one(route)

        print(db.get_all(lambda route: route.move_from == "Kiyv")[0])
    
    def json_db_tests(self):
        route = Route(
            move_from = "Kiyv",
            move_to = "Warsaw",
            date = datetime.datetime.now(),
            travel_time = 100,
            price = 1200,
            passengers_number = 20,
            spots = [
                Spot(name="Bucha", price_from_start=100, date=datetime.datetime.now()),
                Spot(name="Rivne", price_from_start=500, date=datetime.datetime.now()),
                Spot(name="Lutsk", price_from_start=600, date=datetime.datetime.now()),
                Spot(name="Lviv", price_from_start=800, date=datetime.datetime.now())

            ]
        )

        db = JsonRouteDataBase('db/db.json')

        # db.add_one(route)

        print(db.get_all(lambda route: route.move_from == "Kiyv")[0])
