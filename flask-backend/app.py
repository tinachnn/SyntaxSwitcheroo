from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import humps
import boto3

app = Flask(__name__)
dynamodb = boto3.client('dynamodb')

CORS(app)

# convert input text to desired naming convention
@app.route('/', methods=['POST'])
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

# log in user
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json  # Get the JSON data from the request body
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Missing required field(s)'})

    # Check the username and password (add your authentication logic here)
    table_name = 'users'
    response = dynamodb.query(
        TableName=table_name,
        IndexName='username-index',
        KeyConditionExpression= 'username = :val',  # Replace with your attribute name and desired value
        ExpressionAttributeValues= {':val': {'S': username}}  # Replace with the data type of your attribute
    )

    if response['Count'] == 0:
        return jsonify({'message': 'Username does not exist'})

    item = response['Items'][0]
    print(item)
    if password == item['password']['S']:
        return jsonify({'user': { 'userId' : item['userId']['N'] , 'username' : item['username']['S'] }, 'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Incorrect password'})

# create user
@app.route('/api/create', methods=['POST'])
def create_user():
    data = request.json
    print(data)
    username = data.get('username')
    # email = data.get('email')
    password = data.get('password')
    # first_name = data.get('firstName')
    # last_name = data.get('lastName')
    # birthdate = data.get('birthdate')

    if not username or not password:
        return jsonify({'message': 'Missing required field(s)'})

    table_name = 'users'

    # check if username exists in database
    response = dynamodb.query(
        TableName=table_name,
        IndexName='username-index',
        KeyConditionExpression= 'username = :val',  # Replace with your attribute name and desired value
        ExpressionAttributeValues= {':val': {'S': username}}  # Replace with the data type of your attribute
    )

    print(response)
    
    if response['Count']:
        return jsonify({'message' : 'Account with username already exists'})
    else:
        # get next number for user id
        response = dynamodb.update_item(
                TableName=table_name,
                Key={
                    'userId': {'N' : str(0)}
                },
                UpdateExpression='SET next_num = next_num + :val',
                ExpressionAttributeValues={':val': {'N' : str(1)}},
                ReturnValues='UPDATED_NEW'
        )

        new_user_id = response['Attributes']['next_num']
        
        # create user with new user id
        response = dynamodb.put_item(
            TableName=table_name,
            Item={
                'userId': new_user_id,
                'username': {'S': username},
                'password': {'S': password}
            }
    )
    return jsonify({"message": "Account created successfully"}), 200

if __name__ == '__main__':
    app.run()