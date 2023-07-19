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

    short_route = list(filter(lambda x: x.move_from.city == 'Ac', routes))[0]
    assert short_route.count == 2

    short_route = list(filter(lambda x: x.move_from.city == 'Cc', routes))[0]
    assert short_route.count == 1

def test_get_routes_family_by_cities():
    service = ViewRoutesUseCase(DataBaseStub())
    routes = service.get_routes_family_by_cities("Ac", "Bc")
    assert len(routes) == 2

    routes = service.get_routes_family_by_cities("Cc", "Dc")
    assert len(routes) == 1

def test_get_route_by_id():
    service = ViewRoutesUseCase(DataBaseStub())

    route = service.get_route_by_id("1")
    assert route.id == "1"
    assert route.move_from.place.city == "Ac"

    route = service.get_route_by_id("3")
    assert route.id == "3"
    assert route.move_from.place.city == "Cc"
