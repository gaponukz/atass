import datetime
from src.business.entities import Route
from src.business.entities import Place
from src.business.entities import Spot
from src.business.entities import Passenger
from src.usecases.route_availability import RouteAvailabilityUseCase

class DataBaseStub:
    def read_all(self) -> list[Route]:
        return [
            Route(
                id="12345",
                passengers_number=3,
                move_from=Spot(
                    id='start',
                    place=Place(country="Ac", city="Ac", street="As"),
                    date=datetime.datetime.now() + datetime.timedelta(minutes=10),
                ),
                move_to=Spot(
                    id='end',
                    place=Place(country="Bc", city="Bc", street="Bs"),
                    date=datetime.datetime.now() + datetime.timedelta(hours=5),
                ),
                sub_spots=[
                    Spot(
                        id='sub1',
                        place=Place(country="Cc", city="Cc", street="Cs"),
                        date=datetime.datetime.now() + datetime.timedelta(hours=1)
                    ),
                    Spot(
                        id='sub2',
                        place=Place(country="Dc", city="Dc", street="Ds"),
                        date=datetime.datetime.now() + datetime.timedelta(hours=2)
                    ),
                    Spot(
                        id='sub3',
                        place=Place(country="Ec", city="Ec", street="Es"),
                        date=datetime.datetime.now() + datetime.timedelta(hours=3)
                    ),
                ],
                passengers=[
                    Passenger(
                        id="p1",
                        first_name="Af",
                        last_name="Al",
                        phone_number="1",
                        moving_from_id="start",
                        moving_towards_id="end",
                    ),
                    Passenger(
                        id="p2",
                        first_name="Bf",
                        last_name="Bl",
                        phone_number="2",
                        moving_from_id="start",
                        moving_towards_id="sub3",
                    ),
                    Passenger(
                        id="p3",
                        first_name="Cf",
                        last_name="Cl",
                        phone_number="3",
                        moving_from_id="sub1",
                        moving_towards_id="sub2",
                    ),
                ],
                prices={
                    "start": {
                        "end": 5, "sub3": 4, "sub2": 3, "sub1": 2
                    },
                    "sub1": {
                        "end": 4, "sub3": 3, "sub2": 2,
                    },
                    "sub2": {
                        "end": 3, "sub3": 2,
                    },
                    "sub3": {
                        "end": 2
                    }
                }
            )
        ]

# start sub1 sub2 sub3 end
# ===== ==== ==== ====
# ===== ==== ====
#       ====

def generate_all_pathes_test():
    service = RouteAvailabilityUseCase(DataBaseStub())
    pathes = service.generate_all_pathes()

    assert len(pathes) == 4

    for path in pathes:
        assert path.root_route_id == "12345"

        if path.move_from.id == "start":
            assert path.move_to.id == "sub1"
            assert path.price == 2

        if path.move_from.id == "sub3":
            path.move_to.id == "end"
            assert path.price == 2
        
        if path.move_from.id == "sub2":
            path.move_to.id in ['sub3', 'end']
