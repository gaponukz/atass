import unittest
import datetime
from entities import *
from errors import *
from memory_db import MemoryRouteDataBase

class EntitiesTest(unittest.TestCase):
    def test_spot(self):
        spot = Spot(place=Place("Ukraine", "Lviv", "Franko 24"), date=datetime.datetime(2023, 1, 21, 14, 0))

        '''
        Check if we can make route active/unactive
        '''
        self.assertTrue(spot.is_active)
        spot.archive()
        self.assertFalse(spot.is_active)
        spot.unarchive()
        self.assertTrue(spot.is_active)

    def test_route(self):
        route = Route(
            move_from = Spot(place=Place("Ukraine", "Kiyv", "Shevchenko 21"), date=datetime.datetime(2023, 1, 21, 14, 0)),
            move_to = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 1, 23, 10, 30)),
            passengers_number = 20,
            sub_spots = [],
            passengers = []
        )

        '''
        Check if we can make route active/unactive
        '''
        self.assertTrue(route.is_active)
        route.archive()
        self.assertFalse(route.is_active)
        route.unarchive()
        self.assertTrue(route.is_active)

        '''
        Adding and removing spot
        '''
        self.assertEqual(len(route.sub_spots), 0)

        route.add_sub_spot(spot := Spot(
            Place("Ukraine", "Lviv", "Shevchenko 21"),
            datetime.datetime(2023, 1, 22, 10, 0)
        ))

        route.set_spot_price(route.move_from, route.move_to, 1500)
        route.set_spot_price(spot, route.move_from, 800)
        route.set_spot_price(spot, route.move_to, 400)

        self.assertEqual(route.prices, {
            route.move_from.id: { route.move_to.id: 1500, spot.id: 800 },
            spot.id: { route.move_to.id: 400 },
        })

        route.add_sub_spot(another_spot := Spot(
            Place("Ukraine", "Starychi", "Sichovi stril'si 32"),
            datetime.datetime(2023, 1, 22, 13, 0)
        ))

        self.assertEqual(len(route.sub_spots), 2)
        route.remove_sub_spot(spot.id)
        route.remove_sub_spot(another_spot.id)
        self.assertEqual(len(route.sub_spots), 0)

        '''
        Passengers adding/removing, setting passengers_number
        '''
        route.set_passenger_number(3)
        self.assertEqual(route.passengers_number, 3)

        route.add_passenger(adam := Passenger("Adam", "Nut", "+3243254"))
        route.add_passenger(Passenger("Max", "Caw", "+865329652"))
        route.add_passenger(john := Passenger("John", "Lwo", "+35643622"))

        with self.assertRaises(RouteBusIsFullError):
            route.add_passenger(Passenger("Anna", "Posq", "+9356473"))
        
        route.set_passenger_number(3)

        with self.assertRaises(CannotKillPassengersError):
            route.set_passenger_number(2)
        
        route.set_passenger_number(4)
        route.add_passenger(Passenger("Anna", "Posq", "+9356473"))

        route.remove_passenger(adam.id)
        self.assertEqual(len(route.passengers), 3)
        route.remove_passenger(john.id)
        self.assertEqual(len(route.passengers), 2)

class DataBaseTests(unittest.TestCase):
    def test_adding_and_getter_routes(self):
        db = MemoryRouteDataBase()

        db.add_one(route := Route(
            move_from = Spot(place=Place("Ukraine", "Kiyv", "Shevchenko 21"), date=datetime.datetime(2023, 1, 21, 14, 0)),
            move_to = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 1, 23, 10, 30)),
            passengers_number = 20,
            sub_spots = [],
            passengers = []
        ))

        db.add_one(Route(
            move_from = Spot(place=Place("Ukraine", "Kiyv", "Shevchenko 21"), date=datetime.datetime(2023, 2, 1, 12, 40)),
            move_to = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 2, 3, 16, 0)),
            passengers_number = 15,
            sub_spots = [],
            passengers = []
        ))

        db.add_one(Route(
            move_from = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 1, 24, 14, 0)),
            move_to = Spot(place=Place("Ukraine", "Kiyv", "Shevchenko 21"), date=datetime.datetime(2023, 1, 26, 10, 30)),
            passengers_number = 20,
            sub_spots = [],
            passengers = []
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
            move_from = Spot(place=Place("Ukraine", "Kiyv", "Shevchenko 21"), date=datetime.datetime(2023, 1, 21, 14, 0)),
            move_to = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 1, 23, 10, 30)),
            passengers_number = 20,
            sub_spots = [],
            passengers = []
        ))

        db.add_one(Route(
            move_from = Spot(place=Place("Ukraine", "Kiyv", "Shevchenko 21"), date=datetime.datetime(2023, 2, 1, 12, 40)),
            move_to = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 2, 3, 16, 0)),
            passengers_number = 15,
            sub_spots = [],
            passengers = []
        ))

        db.add_one(Route(
            move_from = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 1, 24, 14, 0)),
            move_to = Spot(place=Place("Ukraine", "Kiyv", "Shevchenko 21"), date=datetime.datetime(2023, 1, 26, 10, 30)),
            passengers_number = 20,
            sub_spots = [],
            passengers = []
        ))

        '''
        Test change one route
        '''
        changed = db.change_one(route.id, passengers_number = 15, move_to = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 1, 23, 10, 30)))
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
            move_from = Spot(place=Place("Ukraine", "Kiyv", "Shevchenko 21"), date=datetime.datetime(2023, 1, 21, 14, 0)),
            move_to = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 1, 23, 10, 30)),
            passengers_number = 20,
            sub_spots = [],
            passengers = []
        ))

        db.add_one(Route(
            move_from = Spot(place=Place("Ukraine", "Kiyv", "Shevchenko 21"), date=datetime.datetime(2023, 2, 1, 12, 40)),
            move_to = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 2, 3, 16, 0)),
            passengers_number = 15,
            sub_spots = [],
            passengers = []
        ))

        db.add_one(Route(
            move_from = Spot(place=Place("Poland", "Warsaw", "Gabal 10"), date=datetime.datetime(2023, 1, 24, 14, 0)),
            move_to = Spot(place=Place("Ukraine", "Kiyv", "Shevchenko 21"), date=datetime.datetime(2023, 1, 26, 10, 30)),
            passengers_number = 20,
            sub_spots = [],
            passengers = []
        ))

        db.remove_one(route.id)

        self.assertEqual(len(db), 2)
        
        db.remove_many(lambda _route: _route.move_from.place.city == "Warsaw")

        self.assertEqual(len(db), 1)

        db.remove_many(lambda _: True)

        self.assertEqual(len(db), 0)

if __name__ == "__main__":
    unittest.main()
