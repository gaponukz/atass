from flask import Flask
from flask import request
from flask import jsonify
from config import Config
import logging

app = Flask(__name__)
app.config.from_object(Config)

logging.basicConfig(
    filename='server.log', 
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    datefmt='%H:%M:%S'
)

@app.get('/')
def main_page():
    return jsonify({ "status": "ok" })

@app.get('/get_aviable_routes')
def get_all_routes_page():
    return jsonify({
        "from": [],
        "to": []
    })

if __name__ == '__main__':
    app.run()
