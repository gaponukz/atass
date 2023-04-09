__all__ = 'Service',

import uuid
import datetime
from src import utils
from src.logic import entities
from src.logic import errors

from fastapi import Depends
from loguru import logger

from src.interfaces import IService
from src.interfaces import IRouteDataBase

logger.add("logging/functions.log", level="DEBUG")

class Service(IService):
    def __init__(self, db: IRouteDataBase = Depends()):
        self.db = db

    @logger.catch(reraise=True)
    async def _get_all_routes(self, *args, **kwargs) -> list[entities.Route]:
        logger.info("Try to get routes from database")
        return await self.db.get_all(*args, **kwargs)

    @logger.catch(reraise=True)
    async def _load_route_to_database(self, *args, **kwargs):
        logger.info("Try to load route to database")
        await self.db.add_one(*args, **kwargs)

    @logger.catch(reraise=True)
    async def get_unique_routes(self) -> list[entities.ShortRoute]:
        routes = await self._get_all_routes()
        unique: dict[str, entities.ShortRoute] = {}

        for route in routes:
            key = f"{route.move_from.place.city}-{route.move_to.place.city}"

            if not unique.get(key):
                unique[key] = utils.RouteToShortRouteAdapter(route)
            
            unique[key].count += 1

        return list(unique.values())

    @logger.catch(reraise=True)
    async def get_routes_family_by_cities(self, move_from_city: str, move_to_city: str) -> list[entities.Route]:
        return await self._get_all_routes(lambda route: route.move_from.place.city == move_from_city and route.move_to.place.city == move_to_city) 

    @logger.catch(reraise=True)
    async def get_route_by_id(self, route_id: entities.HashId) -> entities.Route:
        if not (route := await self.db.get_one(route_id)):
            raise errors.RouteNotFoundError(route_id)

        return route

    @logger.catch(reraise=True)
    async def generating_aviable_pathes(self, route: entities.Route) -> list[entities.Path]:
        all_spots = self.get_routes_spots(route)
        results: list[entities.Path] = []

        if not self.is_actual_route(route):
            return []

        sits: dict[entities.HashId, dict[entities.HashId, int]] = {
            all_spots[i].id: {
                all_spots[j].id: 0 for j in range(i+1, len(all_spots))
            } for i in range(len(all_spots)-1)
        }

        for passenger in route.passengers:
            sits[passenger.moving_from.id][passenger.moving_towards.id] += 1

        for i in range(len(all_spots)-1):
            for j in range(i+1, len(all_spots)):
                start_spot = all_spots[i]
                end_spot = all_spots[j]

                if not all((
                    self.is_actual_spot(start_spot),
                    route.prices.get(start_spot.id, {}).get(end_spot.id),
                    sits[start_spot.id][end_spot.id] < route.passengers_number
                )):
                    continue

                results.append(entities.Path(
                    move_from=start_spot,
                    move_to=end_spot,
                    price=route.prices[start_spot.id][end_spot.id],
                    root_route_id=route.id,
                    passengers=[
                        passenger for passenger in route.passengers 
                        if passenger.moving_from.id == start_spot.id \
                        and passenger.moving_towards.id == end_spot.id
                    ]
                ))

        return results

    async def create_routes_copy(
        self,
        route_prototype: entities.RouteProxy,
        datetimes: list[entities._DatetimeObject]
    ) -> list[entities.Route]:
        '''
        Generating list of routes from the route prototype(RouteProxy) and datetimes.
        Number of routes = number of datetimes.
        '''
        routes: list[entities.Route] = []

        for datetime_pair in datetimes:
            move_from_id = str(uuid.uuid4())
            move_to_id = str(uuid.uuid4())

            route_builder = utils.RouteBuiler()\
                .set_move_from(entities.Spot(
                    place=route_prototype.move_from.place,
                    date=datetime_pair["from"],
                    id=move_from_id
                ))\
                .set_move_to(entities.Spot(
                    place=route_prototype.move_to.place,
                    date=datetime_pair["to"],
                    id=move_to_id
                ))\
                .set_passengers_number(route_prototype.passengers_number)\
                .set_description(route_prototype.description)\
                .set_transportation_rules(route_prototype.transportation_rules)\
                .set_rules(route_prototype.rules)

            new_prices: entities.PricesSchema = {}
            ids_replacements: dict[entities.HashId, entities.HashId] = {}
            ids_replacements[route_prototype.move_from.id] = move_from_id
            ids_replacements[route_prototype.move_to.id] = move_to_id

            for spot in route_prototype.sub_spots:
                spot_id = str(uuid.uuid4())
                fake_spot_id = spot.id
                ids_replacements[fake_spot_id] = spot_id

                route_builder.add_subspot(entities.Spot(
                    place=spot.place,
                    date=datetime_pair["from"] + datetime.timedelta(minutes=spot.from_start),
                    id=spot_id
                ))

            for _id in route_prototype.prices:
                new_prices[ids_replacements[_id]] = {}

                for inner_id in route_prototype.prices[_id]:
                    new_prices[ids_replacements[_id]][ids_replacements[inner_id]] = route_prototype.prices[_id][inner_id]
            
            routes.append(route_builder.set_prices(new_prices).build())

        return routes

    def _add_routes(self, routes: list[entities.Route]):
        for route in routes:
            try:
                self._load_route_to_database(route)

            except Exception as error:
                logger.exception(error)
        
    async def add_routes_from_prototype(self, route_prototype: entities.RouteProxy, datetimes: list[entities._DatetimeObject]):
        '''
        Generate routes from prototype, add them to database 
        and return (routes that successfully added to the database)
        '''
        self._add_routes(self.create_routes_copy(route_prototype, datetimes))

    def is_actual_spot(self, spot: entities.Spot) -> bool:
        return spot.date < datetime.datetime.now()

    def is_actual_route(self, route: entities.Route) -> bool:
        return self.is_actual_spot(route.move_to if not route.sub_spots else route.sub_spots[-1])

    def get_routes_spots(self, route: entities.Route) -> list[entities.Spot]:
        routes_spots = route.sub_spots.copy()
        routes_spots.insert(0, route.move_from)
        routes_spots.insert(-1, route.move_to)

        return routes_spots
