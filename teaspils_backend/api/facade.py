import http
import json
from urllib import request

from tb_rest_client.rest_client_ce import *
from tb_rest_client.rest import ApiException


class SocketConnection:
    @staticmethod
    def connect(self, url:str):
        return 'Connecting using sockets'


class DummyConnection:

    @staticmethod
    def connect(self, url:str):
        """
        Dummy fixed data for testing
        """
        print("ENTERING DUMMY DATA")
        dummy_data = [
            {'Timestamp': '2022-04-20 11:00:00.000000', 'co2': 144, 'humidity': 89, 'light': 104, 'plant_id': 1, 'soilHumidity': 63, 'soilTemperature': 23, 'temperature': 25}, 
            {'Timestamp': '2022-04-20 11:10:00.000000', 'co2': 313, 'humidity': 38, 'light': 171, 'plant_id': 1, 'soilHumidity': 22, 'soilTemperature': 25, 'temperature': 23}, 
            {'Timestamp': '2022-04-20 11:20:00.000000', 'co2': 481, 'humidity': 100, 'light': 1866, 'plant_id': 1, 'soilHumidity': 69, 'soilTemperature': 19, 'temperature': 22}, 
            {'Timestamp': '2022-04-20 11:30:00.000000', 'co2': 378, 'humidity': 15, 'light': 384, 'plant_id': 1, 'soilHumidity': 76, 'soilTemperature': 23, 'temperature': 21}, 
            {'Timestamp': '2022-04-20 11:40:00.000000', 'co2': 791, 'humidity': 65, 'light': 1620, 'plant_id': 1, 'soilHumidity': 21, 'soilTemperature': 11, 'temperature': 21}, 
            {'Timestamp': '2022-04-20 11:50:00.000000', 'co2': 589, 'humidity': 45, 'light': 798, 'plant_id': 1, 'soilHumidity': 19, 'soilTemperature': 23, 'temperature': 18}, 
            {'Timestamp': '2022-04-20 12:00:00.000000', 'co2': 123, 'humidity': 81, 'light': 1271, 'plant_id': 1, 'soilHumidity': 95, 'soilTemperature': 23, 'temperature': 23}]

        return dummy_data


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
        elif channel == 'dummy':
            self.channel = DummyConnection()

    def connect(self, url:str):
        if len(self.data) == 0:
            ConnectionFacade.data = self.channel.connect(self, url)
        else:
            pass