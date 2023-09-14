from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import humps

app = Flask(__name__)

CORS(app)

@app.route('/', methods=['GET', 'POST'])
def handle_data():
    if request.method == 'GET':
        return 'Hello World'
    elif request.method == 'POST':
        data = request.get_json()
        return jsonify({ 'text' : humps.camelize(data['text']) })

if __name__ == '__main__':
    app.run()