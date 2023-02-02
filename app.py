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

if __name__ == '__main__':
    app.run()
