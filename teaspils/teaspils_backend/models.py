from django.db import models

class Center(models.Model):
    name = models.CharField(max_length=120)

class Course(models.Model):
    name = models.CharField(max_length=120)
    center = models.ForeignKey(Center, on_delete=models.CASCADE)
    
class Student(models.Model):
    name = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

class Plant(models.Model):
    alias = models.CharField(max_length=100)
    course = models.OneToOneField(Course, on_delete=models.CASCADE)

# Create your models here.
class Measurement(models.Model):
    temperature = models.FloatField(default=0.0)
    noise = models.FloatField(default=0.0)
    timestamp = models.TimeField()

    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)

class Observation(models.Model):
    text = models.TextField(max_length=1200)
    timestamp = models.TimeField()

    author = models.ForeignKey(Student, on_delete=models.CASCADE)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
