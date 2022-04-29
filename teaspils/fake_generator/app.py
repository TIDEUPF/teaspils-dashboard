from flask import Flask
import json
import datetime
from time import sleep
import random

app = Flask(__name__)

@app.route("/")
def generator():

    print("##### ENTERING FAKE GENERATOR #########")

    measures = []

    try:
        for i in range(0, random.randint(4, 9)):
            tmp = {
                'plant_id'      : 1,
                'Timestamp'     : get_timestamp(i),
                'temperature'   : get_temperature(),
                'soilHumidity'  : get_noise(),
                'humidity'      : get_humidity(),
                'co2'           : get_co2(),
                'light'         : get_light()
            }
            measures.append(tmp)
            sleep(0.01)
    except Exception as e:
        print(e)

    return json.dumps(measures, indent=4, sort_keys=True, default=str)

@app.route("/json")
def get_measures():
    print("##### ENTERING FAKE GET MEASURES #########")
    with open('fake_generator/dataset_7-02_15_02.json', 'r') as f:
        data = json.load(f)
        print(data)
        return json.dumps(data, indent=4, sort_keys=True, default=str)


def get_timestamp(i):
    ts = datetime.datetime(2022, 4, 20, 11, 0, 0, 0) + datetime.timedelta(minutes=10*i)
    ts = ts.strftime('%Y-%m-%d %H:%M:%S.%f')
    return ts

    #return datetime.datetime.now()

def get_temperature():
    return random.randint(18,25)

def get_noise():
    return random.randint(0,100)

def get_co2():
    return random.randint(50,800)

def get_humidity():
    return random.randint(0,100)

def get_light():
    return random.randint(100,2000)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)