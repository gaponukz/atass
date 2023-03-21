import os
import sys

from db.json_route_db import JsonRouteDataBase
from logic.entities import *

sys.path.insert(0, os.path.abspath('.'))

db = JsonRouteDataBase()

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
