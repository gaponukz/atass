import unittest
import datetime
from entities import Route, Spot
from memory_db import MemoryRouteDataBase

class DataBasesTests(unittest.TestCase):
    def memory_db_test(self):
        route = Route(
            move_from = Spot(name="Kiyv", price_from_start=0, date=datetime.datetime.now()),
            move_to = Spot(name="Warsaw", price_from_start=1200, date=datetime.datetime.now()),
            passengers_number = 20,
            sub_spots = [
                Spot(name="Bucha", price_from_start=100, date=datetime.datetime.now()),
                Spot(name="Rivne", price_from_start=500, date=datetime.datetime.now()),
                Spot(name="Lutsk", price_from_start=600, date=datetime.datetime.now()),
                Spot(name="Lviv", price_from_start=800, date=datetime.datetime.now())

            ],
            passengers = []
        )

        db = MemoryRouteDataBase()

        db.add_one(route)

        self.assertEqual(len(db), 1)

        db.add_one(route)
        db.add_one(route)

        self.assertEqual(len(db), 3)

if __name__ == "__main__":
    unittest.main()
