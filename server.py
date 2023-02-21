from flask import Flask, request, abort
from db.memory_route_db import MemoryRouteDataBase
from db.utils.entities import Route
import utils

server = Flask(__name__)
db = MemoryRouteDataBase()

@server.post('/add_route')
@utils.auth_required
def my_protected_route():
    try:
        json_route = request.json
        route = Route.from_dict(json_route)
        db.add_one(route)

        return json_route
    
    except Exception as error:
        print(error)
        abort(400, description='Non valid route')

if __name__ == '__main__':
    server.run(port=8000, debug=True)
