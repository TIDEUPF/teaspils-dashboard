from datetime import datetime
from django.db import models
from django.db.models.fields import BLANK_CHOICE_DASH
from django.conf import settings as django_settings


from thumbnails.fields import ImageField

class Center(models.Model):
    name = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.name

class Course(models.Model):
    name = models.CharField(max_length=120)
    center = models.ForeignKey(Center, on_delete=models.CASCADE)

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
    filePath = models.FilePathField(path='uploads/',blank=False)
    image = ImageField(upload_to='uploads/')
    timestamp = models.DateTimeField(default=datetime.now)

    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'Observation by {self.author} @ {self.timestamp}'