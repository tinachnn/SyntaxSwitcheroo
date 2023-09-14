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
        text = data['text']
        convention = data['convention']
        translation = ''
        if convention == 'snake-case':
            translation = humps.decamelize(text)
        elif convention == 'camel-case':
            translation = humps.camelize(data['text'])
        elif convention == 'pascal-case':
            translation = humps.pascalize(data['text'])
        elif convention == 'kebab-case':
            translation = humps.kebabize(data['text'])
        else:
            translation = text

        return jsonify({ 'text' : translation })

if __name__ == '__main__':
    app.run()