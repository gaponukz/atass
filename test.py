from db.utils.entities import Route
import json

with open('route.json', 'r', encoding='utf-8') as out:
    route = json.load(out)

print(Route.from_dict(route))