import datetime
from src.business.entities import Route
from src.business.entities import Place
from src.business.entities import SpotTemplate
from src.business.entities import RoutePrototype
from src.business.entities import DatetimeObject
from src.business.dto import AddRoutesDTO
from src.usecases.add_routes import AddRoutesUseCase

class DataBaseMock:
    def __init__(self) -> None:
        self.routes: list[Route] = []
    
    def create(self, route: Route):
        self.routes.append(route)

now_date = datetime.datetime.now()

prototype = RoutePrototype(
    passengers_number=5,
    move_from=SpotTemplate(
        id="start",
        place=Place(
            country="Ac",
            city="Ac",
            street="As"
        ),
        from_start=0
    ),
    move_to=SpotTemplate(
        id="end",
        place=Place(
            country="Bc",
            city="Bc",
            street="Bs"
        ),
        from_start=2000
    ),
    sub_spots=[
        SpotTemplate(
            id="sub1",
            place=Place(
                country="Cc",
                city="Cc",
                street="Cs"
            ),
            from_start=1500
        )
    ],
    prices={
        "start": {
            "sub1": 5,
            "end": 10
        },
        "sub1": {
            "end": 5
        }
    }
)
dates: list[DatetimeObject] = [
    {"from": now_date, "to": now_date},
    {"from": now_date, "to": now_date},
]

def create_routes_from_prototype_test():
    db = DataBaseMock()
    service = AddRoutesUseCase(db)

    service.create_routes_from_prototype(AddRoutesDTO(route_prototype=prototype, datetimes=dates))
    
    assert len(db.routes) == len(dates)

    for route in db.routes:
        assert route.move_from.place.city == "Ac"
        assert route.move_to.place.city == "Bc"

        assert route.prices[route.move_from.id][route.move_to.id] == 10
        assert route.move_to.date == now_date + datetime.timedelta(minutes=2000)
