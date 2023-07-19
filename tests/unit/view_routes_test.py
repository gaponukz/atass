import datetime
from src.business.entities import Route
from src.business.entities import Spot
from src.business.entities import Place
from src.usecases.view_routes import ViewRoutesUseCase

class DataBaseStub:
    def read_all(self) -> list[Route]:
        return [
            Route(
                id="1",
                passengers_number=1,
                move_from=Spot(
                    place=Place(country="Ac", city="Ac", street="As"),
                    date=datetime.datetime.now()
                ),
                move_to=Spot(
                    place=Place(country="Bc", city="Bc", street="Bs"),
                    date=datetime.datetime.now()
                )
            ),
            Route(
                id="2",
                passengers_number=1,
                move_from=Spot(
                    place=Place(country="Ac", city="Ac", street="As"),
                    date=datetime.datetime.now()
                ),
                move_to=Spot(
                    place=Place(country="Bc", city="Bc", street="Bs"),
                    date=datetime.datetime.now()
                )
            ),
            Route(
                id="3",
                passengers_number=1,
                move_from=Spot(
                    place=Place(country="Cc", city="Cc", street="Cs"),
                    date=datetime.datetime.now()
                ),
                move_to=Spot(
                    place=Place(country="Dc", city="Dc", street="Ds"),
                    date=datetime.datetime.now()
                )
            )
        ]

def test_get_unique_routes():
    service = ViewRoutesUseCase(DataBaseStub())
    routes = service.get_unique_routes()

    assert len(routes) == 2

test_get_unique_routes()