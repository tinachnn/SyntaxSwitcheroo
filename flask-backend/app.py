from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import humps
import boto3
import json

app = Flask(__name__)
dynamodb = boto3.client('dynamodb')

CORS(app)
bcrypt = Bcrypt(app)

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
    table_name = 'users'
    response = dynamodb.get_item(
        TableName=table_name,
        Key={
            'userId': {'N': str(id)}
        }
    )

    if 'Item' in response:
        favorites = response['Item']['favorites']['L']
        temp = [json.loads(f['S']) for f in favorites]
        return jsonify(temp), 200  # Return the item as JSON
    else:
        return jsonify({"error": "Item not found"}), 404

# update items
@app.route('/api/post_data/<id>', methods=['POST'])
def save_data(id):
    data = request.get_json()
    table_name = 'users'
    json_object = json.dumps(data)

    response = dynamodb.query(
        TableName=table_name,
        KeyConditionExpression='userId = :pk',
        FilterExpression='contains(favorites, :val)',
        ExpressionAttributeValues={
            ':pk': {'N': id},
            ':val': {'S': json_object}
        }
    )

    if response['Count'] != 0:
        return jsonify({"message": "Already exists"})

    response = dynamodb.update_item(
        TableName=table_name,
        Key={'userId' : {'N' : id}},
        UpdateExpression='SET favorites = list_append(if_not_exists(favorites, :empty_list), :fave)',
        ExpressionAttributeValues={
            ':fave' : {'L': [{'S' : json_object}]},
            ':empty_list' : {'L' : []}
        }
    )
    return jsonify({"message": "Data saved successfully"}), 200

# delete
@app.route('/api/delete_data/<id>/<idx>', methods=['DELETE'])
def delete_data(id, idx):
    table_name = 'users'
    update_exp = f"REMOVE favorites[{idx}]"
    response = dynamodb.update_item(
        TableName=table_name,
        Key={'userId' : {'N' : id}},
        UpdateExpression=update_exp
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
    if bcrypt.check_password_hash(item['password']['B'], password):
        return jsonify({'user': { 'userId' : item['userId']['N'] , 'username' : item['username']['S'] }, 'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Incorrect password'})

# create user
@app.route('/api/create', methods=['POST'])
def create_user():
    data = request.json
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
        hashed_password = bcrypt.generate_password_hash(password)
        
        # create user with new user id
        response = dynamodb.put_item(
            TableName=table_name,
            Item={
                'userId': new_user_id,
                'username': {'S': username},
                'password': {'B': hashed_password}
            }
    )
    return jsonify({'user': {'userId' : new_user_id['N'], 'username' : username }, 'message': "Account created successfully"}), 200

if __name__ == '__main__':
    app.run()