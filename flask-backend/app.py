from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import humps
import boto3

app = Flask(__name__)
dynamodb = boto3.client('dynamodb')

CORS(app)

# convert input text to desired naming convention
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

# get all items
@app.route('/api/get_data', methods=['GET'])
def get_data():
    table_name = 'users'
    response = dynamodb.scan(
            TableName=table_name,
        )
    items = response.get('Items', [])
    return jsonify(items), 200

# get item by id
@app.route('/api/get_data/<id>', methods=['GET'])
def get_item(id):
    # return 'Hello World'
    table_name = 'users'
    response = dynamodb.get_item(
        TableName=table_name,
        Key={
            'userId': {'N': id}
        }
    )

    if 'Item' in response:
        item = response['Item']
        return jsonify(item), 200  # Return the item as JSON
    else:
        return jsonify({"error": "Item not found"}), 404

# post item to database
@app.route('/api/post_data', methods=['POST'])
def save_data():
    data = request.get_json()
    table_name = 'users'
    response = dynamodb.put_item(
        TableName=table_name,
        Item={
            'userId': {'N': str(data['id'])},
            'inputText': {'S': data['input']},
            'outputText': {'S': data['output']}
            # Add other attributes as needed
        }
    )
    return jsonify({"message": "Data saved successfully"}), 200

if __name__ == '__main__':
    app.run()