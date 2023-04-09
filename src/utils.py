from __future__ import annotations
from src.logic import entities

class RouteToShortRouteAdapter(entities.ShortRoute):
    def __init__(self, route: entities.Route, count: int = 0):
        super().__init__(move_from=route.move_from.place.copy(), move_to=route.move_to.place.copy(), count=count)

class RouteBuiler:
    def __init__(self):
        self._dict_route_prototype = {}
    
    def set_move_from(self, move_from: entities.Spot) -> RouteBuiler:
        self._dict_route_prototype['move_from'] = move_from
        return self
    
    def set_move_to(self, move_to: entities.Spot) -> RouteBuiler:
        self._dict_route_prototype['move_to'] = move_to
        return self
    
    def set_passengers_number(self, passengers_number: int) -> RouteBuiler:
        self._dict_route_prototype['passengers_number'] = passengers_number
        return self

    def set_description(self, description: entities.MultiLanguages) -> RouteBuiler:
        self._dict_route_prototype['description'] = description
        return self
    
    def set_transportation_rules(self, transportation_rules: entities.MultiLanguages) -> RouteBuiler:
        self._dict_route_prototype['transportation_rules'] = transportation_rules
        return self

    def set_rules(self, rules: entities.MultiLanguages) -> RouteBuiler:
        self._dict_route_prototype['rules'] = rules
        return self
    
    def add_subspot(self, sub_spot: entities.Spot) -> RouteBuiler:
        if not self._dict_route_prototype.get('sub_spot'):
            self._dict_route_prototype['sub_spot'] = []
        
        self._dict_route_prototype['sub_spot'].append(sub_spot)
        return self

    def set_prices(self, prices: entities.PricesSchema) -> RouteBuiler:
        self._dict_route_prototype['prices'] = prices
        return self
    
    def build(self) -> entities.Route:
        return entities.Route(**self._dict_route_prototype)
