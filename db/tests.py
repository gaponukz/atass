import unittest
import datetime
from entities import *
from errors import *
from memory_db import MemoryRouteDataBase

class DataBasesTests(unittest.TestCase):
    def test_adding_routes(self):
        route = Route(
            move_from = Spot(name="Kiyv", price_from_start=0, date=datetime.datetime(2024, 1, 21, 14, 0)),
            move_to = Spot(name="Warsaw", price_from_start=1200, date=datetime.datetime(2023, 1, 23, 10, 30)),
            passengers_number = 20,
            sub_spots = [],
            passengers = []
        )

        db = MemoryRouteDataBase()

        '''
        Check if we can add some route
        '''
        length = len(db)
        db.add_one(route)

        self.assertEqual(len(db), length + 1)
        self.assertEqual(len(db.get_all()), length + 1)

        '''
        Check if we correct added route
        '''

        filtered = db.get_all(lambda _route: (
            _route.move_from.name == "Kiyv"
            and _route.move_to.name == "Warsaw"
            and _route.move_from.date == datetime.datetime(2024, 1, 21, 14, 0)
        ))

        self.assertEqual(len(filtered), 1)

        # with self.assertRaises(Exception):
        #     pass

        # self.assertTrue(some)
        # self.assertEqual(some, some)

if __name__ == "__main__":
    unittest.main()
