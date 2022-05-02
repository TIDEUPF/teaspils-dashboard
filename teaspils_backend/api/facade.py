import http
import json
from urllib import request

from tb_rest_client.rest_client_ce import *
from tb_rest_client.rest import ApiException


class SocketConnection:
    @staticmethod
    def connect(self, url:str):
        return 'Connecting using sockets'

class HttpConnection:

    @staticmethod
    def connect(self, url:str):
        print(f"Connecting to: {url}")
        #result:http.client.HttpResponse = request.urlopen('https://raw.githubusercontent.com/rferrers/Teaspils/main/DataAll.json')
        result:http.client.HttpResponse = request.urlopen(url)
        json_result = json.loads(result.read().decode('utf-8'))
        return json_result


class ThingsBoardConnection:

    @staticmethod
    def connect(self, url:str):
        print(f"Connecting to: {url}")

        # ThingsBoard REST API URL
        url:str = "https://demo.thingsboard.io:443"
        # Default Tenant Administrator credentials
        username:str = "ariel.ortiz@upf.edu"
        password:str = "sl070120"


        #https://demo.thingsboard.io:443/api/plugins/telemetry/DEVICE/9ab0b310-9969-11ec-bc54-a5f66612cebd/values/timeseries?useStrictDataTypes=true
        with RestClientCE(base_url=url) as rest_client:
            try:
                # Auth with credentials
                rest_client.login(username=username, password=password)

                device_id = '9ab0b310-9969-11ec-bc54-a5f66612cebd'

                found_device = rest_client.get_device_by_id(DeviceId('DEVICE', device_id))
                print("Found device attributes: \n%r", found_device)

                keys_dict = 'temperature,humidity,co2,light,soilHumidity,soilTemperature'

                #TODO define start_ts as the timestamp from 1 week ago
                #TODO define end_ts as the current timestamp 

                # telemetry = rest_client.get_latest_timeseries('DEVICE', device_id)
                telemetry = rest_client.get_timeseries('DEVICE', device_id , keys= keys_dict, start_ts='1646166242000' ,end_ts='1646339042000',)
                print("Found parametrized telemetry: \n%r", telemetry)

            except ApiException as e:
                print(e)


class ConnectionFacade:

    data = {}

    def __init__(self, channel:str):

        if channel == 'sockets':
            self.channel = SocketConnection()
        elif channel == 'http':
            self.channel = HttpConnection()
        elif channel == 'thingsb':
            self.channel = ThingsBoardConnection()

    def connect(self, url:str):
        if len(self.data) == 0:
            print("FIRST TIME")
            ConnectionFacade.data = self.channel.connect(self, url)
        else:
            print("DO NOTHING")