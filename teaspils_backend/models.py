from datetime import datetime
import json
from django.db import models
from django.db.models.fields import BLANK_CHOICE_DASH
from django.conf import settings
from django.contrib import admin

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

class Center(models.Model):
    name = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.name

class Course(models.Model):
    name = models.CharField(max_length=120)
    center = models.ForeignKey(Center, on_delete=models.CASCADE)
    secret_word = models.CharField(max_length=12)

    def validateSecret(self, input):
        return True if input == self.secret_word else False

    def __str__(self) -> str:
        return f'{self.name} @ {self.center.name}'
    
class Student(models.Model):
    name = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name
#TODO Cambiar One to one a one to many con Courses
class Plant(models.Model):
    alias = models.CharField(max_length=100)
    data_source = models.CharField(max_length=512, default='no-source', null=False)

    course = models.OneToOneField(Course, on_delete=models.CASCADE)
    

    def __str__(self) -> str:
        return self.alias

# Create your models here.
class Measurement(models.Model):
    temperature = models.FloatField(default=0.0, null=True)
    noise = models.FloatField(default=0.0, null=True)
    timestamp = models.TimeField(default=datetime.now)

    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'Plant {self.plant.id} status: Temp:{self.temperature}, Noise:{self.noise} @ {self.timestamp}'

class Observation(models.Model):
    author = models.TextField(max_length=50)
    text = models.TextField(max_length=1200)
    image = models.ImageField(upload_to='obs_images/')
    image_thumbnail = ImageSpecField(source='image',
                                     processors=[ResizeToFill(64,64)],
                                     format='JPEG',
                                     options={'quality':60})

    timestamp = models.DateTimeField(default=datetime.now)

    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'Plant observation by {self.author} @ {self.timestamp}'

class MeasureObservation(models.Model):
    author = models.TextField(max_length=50)
    text = models.TextField(max_length=1200)
    image = models.ImageField(upload_to='obs_images/')
    image_thumbnail = ImageSpecField(source='image',
                                     processors=[ResizeToFill(64,64)],
                                     format='JPEG',
                                     options={'quality':60})

    timestamp = models.DateTimeField(blank=False)

    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    measure_timestamp = models.DateTimeField()

    def __str__(self) -> str:
        return f'Measure observation by {self.author} @ {self.plant} - {self.measure_timestamp}'    

class PlantSettings(models.Model):

    low_temperature = models.IntegerField(default=0)
    high_temperature = models.IntegerField(default=100)
    low_noise = models.IntegerField(default=0)
    high_noise = models.IntegerField(default=0)
    low_soilHum = models.IntegerField(default=0)
    high_soilHum = models.IntegerField(default=100)
    low_soilTemp = models.IntegerField(default=0)
    high_soilTemp = models.IntegerField(default=100)
    low_co2 = models.IntegerField(default=0)
    high_co2 = models.IntegerField(default=1000)
    low_humidity = models.IntegerField(default=0)
    high_humidity = models.IntegerField(default=100)
    low_light = models.IntegerField(default=0)
    high_light = models.IntegerField(default=3000)

    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)


    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)



"""
ADMIN MODELS
"""

class PlantAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
