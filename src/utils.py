import typing
import datetime
from src.business import entities

class RouteToShortRouteAdapter(entities.ShortRoute):
    def __init__(self, route: entities.Route, count: int = 0):
        super().__init__(move_from=route.move_from.place.copy(), move_to=route.move_to.place.copy(), count=count)

class FromTemplateToRouteAdapter(entities.Route):
    def __init__(self, route: entities.RoutePrototype, date_pair: entities.DatetimeObject):
        new_route = route.dict()
        new_route['move_from']['date'] = date_pair['from']
        new_route['move_to']['date'] = date_pair['to']

        for i in range(len(route.sub_spots)):
            new_route['sub_spots'][i]['date'] = date_pair['from'] + datetime.timedelta(minutes=route.sub_spots[i].from_start)
        
        super().__init__(**new_route)

class FilterComparatorTemplate:
    def _compare_filters(self, entity: typing.Any, _filter: dict[str, typing.Any]) -> bool:
        entity = self._entity_hook(entity)

        if not _filter:
            return True

        def check_nested_fields(entity, _filter):
            for key, value in _filter.items():
                if key not in entity:
                    return False
                
                if isinstance(value, dict):
                    if not check_nested_fields(entity[key], value):
                        return False
                
                else:
                    if entity[key] != value:
                        return False
                
            return True

        return check_nested_fields(entity, _filter)

    def _entity_hook(self, entity: typing.Any) -> dict[str, typing.Any]:
        return entity
