from flask import Flask, request, abort, jsonify
from db.memory_route_db import MemoryRouteDataBase
from db.utils.entities import Route
import utils

server = Flask(__name__)
db = MemoryRouteDataBase()

@server.post('/add_route')
@utils.auth_required
def add_new_route_page():
    try:
        json_route = request.json
        route = Route.from_dict(json_route)
        db.add_one(route)

        return json_route
    
    except Exception as error:
        print(error)
        abort(400, description='Non valid route')

@server.get('/get_routes')
def get_public_routes_page():
    return jsonify(db.get_all())

if __name__ == '__main__':
    server.run(port=8000, debug=True)
