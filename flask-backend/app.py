from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import humps
import boto3
import json

app = Flask(__name__)
dynamodb = boto3.client('dynamodb')
TABLE_NAME = 'users'

CORS(app)
bcrypt = Bcrypt(app)

# convert input text to desired naming convention
@app.route('/api/convert', methods=['POST'])
def handle_data():
    data = request.json
    text = data.get('text')
    conv = data.get('conv')
    lines = text.splitlines()
    new_lines = []
    for line in lines:
        words = line.split()
        func = get_function(conv) # get appropriate pyhumps function
        new_words = [func(word) for word in words] # translate each word then rejoin
        new_lines.append(" ".join(new_words))
    translation = "\n".join(new_lines)

    return jsonify(translation), 200

# returns pyhumps function
def get_function(convention):
    if convention == 'snake-case':
        return humps.decamelize
    elif convention == 'camel-case':
        return humps.camelize
    elif convention == 'pascal-case':
        return humps.pascalize
    elif convention == 'kebab-case':
        return humps.kebabize

# get favorites by id
@app.route('/api/get_favorites/<id>', methods=['GET'])
def get_favorites(id):
    response = dynamodb.get_item(
        TableName=TABLE_NAME,
        Key={'userId' : {'N': str(id)}}
    )
    favorites = response['Item']['favorites']['L']
    temp = [json.loads(f['S']) for f in favorites]

    return jsonify(temp), 200

# add to favorites
@app.route('/api/add_favorite/<id>', methods=['POST'])
def add_favorite(id):
    data = request.json

    # check for input text
    if not data.get('input') or not data.get('output'):
        return '', 400

    data = json.dumps(data)

    # check if already exists in db
    response = dynamodb.query(
        TableName=TABLE_NAME,
        KeyConditionExpression='userId = :pk',
        FilterExpression='contains(favorites, :val)',
        ExpressionAttributeValues={
            ':pk': {'N': id},
            ':val': {'S': data}
        }
    )

    if response['Count'] == 0:
    # add to favorites
        response = dynamodb.update_item(
            TableName=TABLE_NAME,
            Key={'userId' : {'N' : id}},
            UpdateExpression='SET favorites = list_append(if_not_exists(favorites, :empty_list), :fave)',
            ExpressionAttributeValues={
                ':fave' : {'L': [{'S' : data}]},
                ':empty_list' : {'L' : []}
            }
        )

    return '', 200

# delete from favorites
@app.route('/api/delete_favorite/<id>/<idx>', methods=['DELETE'])
def delete_favorite(id, idx):
    # remove favorite at index
    update_exp = f"REMOVE favorites[{idx}]"
    response = dynamodb.update_item(
        TableName=TABLE_NAME,
        Key={'userId' : {'N' : id}},
        UpdateExpression=update_exp
    )

    return '', 200

# log in user
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json  # Get the JSON data from the request body
    username = data.get('username')
    password = data.get('password')

    # check for required fields
    if not username or not password:
        return '', 400

    # check that username exists in db
    response = dynamodb.query(
        TableName=TABLE_NAME,
        IndexName='username-index',
        KeyConditionExpression= 'username = :val',
        ExpressionAttributeValues= {':val': {'S': username}}
    )

    if response['Count'] == 0:
        error = 'Username does not exist'
        return jsonify(error), 401

    item = response['Items'][0]
    # checks for correct password
    if bcrypt.check_password_hash(item['password']['B'], password):
        userId = item['userId']['N']
        username = item['username']['S']
        return jsonify({ 'userId' : userId , 'username' : username }), 200
    
    else:
        error = 'Incorrect password'
        return jsonify(error), 401

# create user
@app.route('/api/create', methods=['POST'])
def create_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # checks for required fields
    if not username or not password:
        return '', 400

    # check that username does not exist in db
    response = dynamodb.query(
        TableName=TABLE_NAME,
        IndexName='username-index',
        KeyConditionExpression= 'username = :val',
        ExpressionAttributeValues= {':val': {'S': username}}
    )
    
    if response['Count'] > 0:
        error = 'Account with username already exists'
        return jsonify(error), 400

    # get next number for user id
    response = dynamodb.update_item(
            TableName=TABLE_NAME,
            Key={'userId' : {'N' : str(0)}},
            UpdateExpression='SET next_num = next_num + :val',
            ExpressionAttributeValues={':val': {'N' : str(1)}},
            ReturnValues='UPDATED_NEW'
    )

    new_user_id = response['Attributes']['next_num']
    hashed_password = bcrypt.generate_password_hash(password)
    
    # create user with new user id
    response = dynamodb.put_item(
        TableName=TABLE_NAME,
        Item={
            'userId': new_user_id,
            'username': {'S': username},
            'password': {'B': hashed_password}
        }
    )

    return jsonify({'userId' : new_user_id['N'], 'username' : username }), 200

if __name__ == '__main__':
    app.run()