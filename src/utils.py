import datetime
from src.logic import entities

class RouteToShortRouteAdapter(entities.ShortRoute):
    def __init__(self, route: entities.Route, count: int = 0):
        super().__init__(move_from=route.move_from.place.copy(), move_to=route.move_to.place.copy(), count=count)

class FromTemplateToRouteAdapter(entities.Route):
    def __init__(self, route: entities.RouteTemplate, date_pair: entities.DatetimeObject):
        new_route = route.dict()
        new_route['move_from']['date'] = date_pair['from']
        new_route['move_to']['date'] = date_pair['to']

        for i in range(len(route.sub_spots)):
            new_route['sub_spots'][i]['date'] = date_pair['from'] + datetime.timedelta(minutes=route.sub_spots[i].from_start)
        
        super().__init__(**new_route)
