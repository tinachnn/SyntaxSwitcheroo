import unittest
import json
from app import app

class TestCase(unittest.TestCase):
    test_client = app.test_client()
    text = 'hello_world'
    multiline_text = 'hello_world = 10\ngoodbye_world = 100\ntotal_worlds = hello_world + goodbye_world\nprint(total_worlds)'
    headers = {
        'Content-Type': 'application/json'
    }

    def test_to_snake(self):
        text = 'helloWorld'
        data = {
            'text' : text,
            'convention' : 'snake-case'
        }
        response = self.test_client.post('/', data=json.dumps(data), headers=self.headers)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['text'], 'hello_world')

    def test_multiline_to_snake(self):
        text = 'helloWorld = 10\ngoodbyeWorld = 100\ntotalWorlds = helloWorld + goodbyeWorld\nprint(totalWorlds)'
        data = {
            'text' : text,
            'convention' : 'snake-case'
        }
        response = self.test_client.post('/', data=json.dumps(data), headers=self.headers)
        data = json.loads(response.data)
        expected = self.multiline_text
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['text'], expected)

    def test_to_camel(self):
        data = {
            'text' : self.text,
            'convention' : 'camel-case'
        }
        response = self.test_client.post('/', data=json.dumps(data), headers=self.headers)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['text'], 'helloWorld')

    def test_multiline_to_camel(self):
        data = {
            'text' : self.multiline_text,
            'convention' : 'camel-case'
        }
        response = self.test_client.post('/', data=json.dumps(data), headers=self.headers)
        data = json.loads(response.data)
        expected = 'helloWorld = 10\ngoodbyeWorld = 100\ntotalWorlds = helloWorld + goodbyeWorld\nprint(totalWorlds)'
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['text'], expected)

    def test_to_pascal(self):
        data = {
            'text' : self.text,
            'convention' : 'pascal-case'
        }
        response = self.test_client.post('/', data=json.dumps(data), headers=self.headers)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['text'], 'HelloWorld')

    def test_multiline_to_pascal(self):
        data = {
            'text' : self.multiline_text,
            'convention' : 'pascal-case'
        }
        response = self.test_client.post('/', data=json.dumps(data), headers=self.headers)
        data = json.loads(response.data)
        expected = 'HelloWorld = 10\nGoodbyeWorld = 100\nTotalWorlds = HelloWorld + GoodbyeWorld\nPrint(totalWorlds)'
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['text'], expected)

    def test_to_kebab(self):
        data = {
            'text' : self.text,
            'convention' : 'kebab-case'
        }
        response = self.test_client.post('/', data=json.dumps(data), headers=self.headers)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['text'], 'hello-world')

    def test_multiline_to_kebab(self):
        data = {
            'text' : self.multiline_text,
            'convention' : 'kebab-case'
        }
        response = self.test_client.post('/', data=json.dumps(data), headers=self.headers)
        data = json.loads(response.data)
        expected = 'hello-world = 10\ngoodbye-world = 100\ntotal-worlds = hello-world + goodbye-world\nprint(total-worlds)'
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['text'], expected)


if __name__ == '__main__':
    unittest.main()