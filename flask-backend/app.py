from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import humps

app = Flask(__name__)

CORS(app)

@app.route('/', methods=['GET', 'POST'])
def handle_data():
    data = request.get_json()
    lines = data['text'].splitlines()
    new_lines = []
    for line in lines:
        words = line.split()
        func = get_function(data['convention'])
        new_words = [func(word) for word in words]
        new_lines.append(" ".join(new_words))

    return jsonify({ 'text' : "\n".join(new_lines) })

def get_function(convention):
    if convention == 'snake-case':
        return humps.decamelize
    elif convention == 'camel-case':
        return humps.camelize
    elif convention == 'pascal-case':
        return humps.pascalize
    elif convention == 'kebab-case':
        return humps.kebabize

if __name__ == '__main__':
    app.run()