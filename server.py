import uvicorn
import fastapi

import logic.functions
import logic.entities
import logic.errors
import authentication
import utils

from webtyping import Response

app = fastapi.FastAPI()

@app.get("/get_unique_routes")
@utils.catch_exceptions
async def unique_routes_page() -> Response[list[logic.entities.ShortRoute]]:
    return Response(
        status = 200,
        message = "Success",
        body = await logic.functions.get_unique_routes()
    )

@app.get("/get_routes_family", dependencies=[fastapi.Depends(authentication.admin_required)])
@utils.catch_exceptions
async def get_routes_family_page(move_from_city: str, move_to_city: str) -> Response[list[logic.entities.Route]]:
    return Response(
        status = 200,
        message = "Success",
        body = await logic.functions.get_routes_family_by_cities(move_from_city, move_to_city)
    )

@app.get("get_route", dependencies=[fastapi.Depends(authentication.admin_required)])
@utils.catch_exceptions
async def get_route_page(route_id: logic.entities.HashId) -> logic.entities.Route:
    try:
        return Response(
            status = 200,
            message = "Success",
            body = await logic.functions.get_route_by_id(route_id)
        )
    
    except logic.errors.RouteNotFoundError as error:
        return Response(
            status = 404,
            message = f"{error.__class__.__name__}: {error}",
            body = None
        )

if __name__ == "__main__":
    uvicorn.run("server:app", host="localhost", port=5000, reload=True)
