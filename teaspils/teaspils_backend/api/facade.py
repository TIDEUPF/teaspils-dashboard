import http
import json
from urllib import request

class SocketConnection:
    @staticmethod
    def connect(self, url:str):
        return 'Connecting using sockets'

class HttpConnection:
    @staticmethod
    def connect(self, url:str):
        print(f"Connecting to: {url}")
        result:http.client.HttpResponse = request.urlopen('https://raw.githubusercontent.com/rferrers/Teaspils/main/DataAll.json')
        json_result = json.loads(result.read().decode('utf-8'))
        print(json_result)
        return json_result

class ConnectionFacade:
    def __init__(self, channel:str):

        if channel == 'sockets':
            self.channel = SocketConnection()
        elif channel == 'http':
            self.channel = HttpConnection()

    def connect(self, url:str):
        return self.channel.connect(self, url)