from flask import Flask
import json
import datetime
from time import sleep
import random

app = Flask(__name__)

@app.route("/")
def generator():

    measures = []

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

    return json.dumps(measures, indent=4, sort_keys=True, default=str)



def get_timestamp():
    return datetime.datetime.now()

def get_temperature():
    return random.randint(18, 28)

def get_noise():
    return random.randint(50, 90)

def get_co2():
    return random.randint(800,1800)

def get_humidity():
    return random.randint(40,95)

def get_light():
    return random.randint(20,1000)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)