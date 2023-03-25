import uvicorn

import logic.functions
import logic.entities
import logic.errors
import authentication

from fastapi import Depends
from fastapi import FastAPI
from webtyping import Response
from webtyping import AddRoutesDTO

from loguru import logger

app = FastAPI()
logger.add("logging/server.log")

@logger.catch
@app.get("/get_unique_routes")
async def unique_routes_page(
        service: logic.functions.Service = Depends()
    ) -> Response[list[logic.entities.ShortRoute]]:
    
    return Response(body = await service.get_unique_routes())

@logger.catch
@app.get("/get_routes_family", dependencies=[Depends(authentication.admin_required)])
async def get_routes_family_page(
        move_from_city: str,
        move_to_city: str,
        service: logic.functions.Service = Depends()
    ) -> Response[list[logic.entities.Route]]:
    
    return Response(body = await service.get_routes_family_by_cities(move_from_city, move_to_city))

@logger.catch
@app.get("/get_route", dependencies=[Depends(authentication.admin_required)])
async def get_route_page(
        route_id: logic.entities.HashId,
        service: logic.functions.Service = Depends()
    ) -> Response[logic.entities.Route]:
    
    try:
        return Response(body = await service.get_route_by_id(route_id))
    
    except logic.errors.RouteNotFoundError as error:
        return Response(
            status = 404,
            message = f"{error.__class__.__name__}: {error}",
            body = None
        )

@logger.catch
@app.post("/add_routes", dependencies=[Depends(authentication.admin_required)])
async def add_routes_page(
        routes_instruction: AddRoutesDTO,
        service: logic.functions.Service = Depends()
    ) -> Response[bool]:
    
    # TODO: service.add_routes_copy(routes_instruction.root_route, routes_instruction.dates)
    return Response(body = True)

if __name__ == "__main__":
    uvicorn.run("server:app", host="localhost", port=5000, reload=True)
