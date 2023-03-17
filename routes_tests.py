import unittest
import datetime
from logic.entities import *
from logic.errors import *
from db.memory_route_db import MemoryRouteDataBase

class DataBaseTests(unittest.TestCase):
    def test_adding_and_getter_routes(self):
        db = MemoryRouteDataBase()

        db.add_one(route := Route(
            move_from = Spot(place=Place(country="Ukraine", city="Kiyv", street="Shevchenko 21"), date=datetime.datetime(2023, 1, 21, 14, 0)),
            move_to = Spot(place=Place(country="Poland", city="Warsaw", street="Gabal 10"), date=datetime.datetime(2023, 1, 23, 10, 30)),
            passengers_number = 20
        ))

        db.add_one(Route(
            move_from = Spot(place=Place(country="Ukraine", city="Kiyv", street="Shevchenko 21"), date=datetime.datetime(2023, 2, 1, 12, 40)),
            move_to = Spot(place=Place(country="Poland", city="Warsaw", street="Gabal 10"), date=datetime.datetime(2023, 2, 3, 16, 0)),
            passengers_number = 15
        ))

        db.add_one(Route(
            move_from = Spot(place=Place(country="Poland", city="Warsaw", street="Gabal 10"), date=datetime.datetime(2023, 1, 24, 14, 0)),
            move_to = Spot(place=Place(country="Ukraine", city="Kiyv", street="Shevchenko 21"), date=datetime.datetime(2023, 1, 26, 10, 30)),
            passengers_number = 20
        ))

        '''
        Check if we can add some routes
        '''

        self.assertEqual(len(db), 3)
        self.assertEqual(len(db.get_all()), 3)

        '''
        Check if we correct added route
        '''
        filtered = db.get_all(lambda _route: (
            _route.move_from.place.city == "Kiyv"
            and _route.move_to.place.city == "Warsaw"
            and _route.move_from.date == datetime.datetime(2023, 1, 21, 14, 0)
        ))
        
        self.assertEqual(len(filtered), 1)

        this_route = filtered[0]
        this_one = db.get_one(this_route.id)
        self.assertTrue(this_route.id == route.id == this_one.id)

    def test_change(self):
        db = MemoryRouteDataBase()

        db.add_one(route := Route(
            move_from = Spot(place=Place(country="Ukraine", city="Kiyv", street="Shevchenko 21"), date=datetime.datetime(2023, 1, 21, 14, 0)),
            move_to = Spot(place=Place(country="Poland", city="Warsaw", street="Gabal 10"), date=datetime.datetime(2023, 1, 23, 10, 30)),
            passengers_number = 20
        ))

        db.add_one(Route(
            move_from = Spot(place=Place(country="Ukraine", city="Kiyv", street="Shevchenko 21"), date=datetime.datetime(2023, 2, 1, 12, 40)),
            move_to = Spot(place=Place(country="Poland", city="Warsaw", street="Gabal 10"), date=datetime.datetime(2023, 2, 3, 16, 0)),
            passengers_number = 15
        ))

        db.add_one(Route(
            move_from = Spot(place=Place(country="Poland", city="Warsaw", street="Gabal 10"), date=datetime.datetime(2023, 1, 24, 14, 0)),
            move_to = Spot(place=Place(country="Ukraine", city="Kiyv", street="Shevchenko 21"), date=datetime.datetime(2023, 1, 26, 10, 30)),
            passengers_number = 20
        ))

        '''
        Test change one route
        '''
        changed = db.change_one(route.id, passengers_number = 15, move_to = Spot(place=Place(country="Poland", city="Warsaw", street="Gabal 10"), date=datetime.datetime(2023, 1, 23, 10, 30)))
        self.assertEqual(changed.passengers_number, 15)
        self.assertEqual(route.id, changed.id) # route id/hash changes dynamically
        self.assertEqual(changed.move_to.place.city, "Warsaw")

        '''
        Test change many
        '''
        changed = db.change_many(lambda _: True, passengers_number = 21) # all
        self.assertTrue(all([_route.passengers_number == 21 for _route in db.get_all()]))
        self.assertTrue(all([_route.passengers_number == 21 for _route in changed]))
    
    def test_remove_routes(self):
        db = MemoryRouteDataBase()

        db.add_one(route := Route(
            move_from = Spot(place=Place(country="Ukraine", city="Kiyv", street="Shevchenko 21"), date=datetime.datetime(2023, 1, 21, 14, 0)),
            move_to = Spot(place=Place(country="Poland", city="Warsaw", street="Gabal 10"), date=datetime.datetime(2023, 1, 23, 10, 30)),
            passengers_number = 20
        ))

        db.add_one(Route(
            move_from = Spot(place=Place(country="Ukraine", city="Kiyv", street="Shevchenko 21"), date=datetime.datetime(2023, 2, 1, 12, 40)),
            move_to = Spot(place=Place(country="Poland", city="Warsaw", street="Gabal 10"), date=datetime.datetime(2023, 2, 3, 16, 0)),
            passengers_number = 15
        ))

        db.add_one(Route(
            move_from = Spot(place=Place(country="Poland", city="Warsaw", street="Gabal 10"), date=datetime.datetime(2023, 1, 24, 14, 0)),
            move_to = Spot(place=Place(country="Ukraine", city="Kiyv", street="Shevchenko 21"), date=datetime.datetime(2023, 1, 26, 10, 30)),
            passengers_number = 20
        ))

        db.remove_one(route.id)

        self.assertEqual(len(db), 2)
        
        db.remove_many(lambda _route: _route.move_from.place.city == "Warsaw")

        self.assertEqual(len(db), 1)

        db.remove_many(lambda _: True)

        self.assertEqual(len(db), 0)

if __name__ == "__main__":
    unittest.main()
