from urllib import request
import http
import json

class Connector:

    def connect(self, url:str):
        print(f"Connecting to: {url}")
        result:http.client.HttpResponse = request.urlopen('https://raw.githubusercontent.com/rferrers/Teaspils/main/DataAll.json')
        json_result = json.loads(result.read().decode('utf-8'))
        print(json_result)
        return json_result