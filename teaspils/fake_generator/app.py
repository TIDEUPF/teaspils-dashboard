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
                'timestamp'     : get_timestamp(),
                'temperature'   : get_temperature(),
                'noise'         : get_noise(),
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


def get_timestamp():
    return datetime.datetime.now()

def get_temperature():
    return random.randint(18,25)

def get_noise():
    return random.randint(120,280)

def get_co2():
    return random.randint(4,8)

def get_humidity():
    return random.randint(1000,2000)

def get_light():
    return random.randint(2200,3100)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)