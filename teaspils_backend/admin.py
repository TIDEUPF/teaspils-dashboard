from django.contrib import admin
from .models import Center, Course, MeasureObservation, Measurement, Observation, PlantSettings, Student, Plant

# USER: root
# PASS: teaspils22

# Register your models here.
admin.site.register(Measurement)
admin.site.register(Observation)
admin.site.register(MeasureObservation)
admin.site.register(Student)
admin.site.register(Plant)
admin.site.register(Course)
admin.site.register(Center)
admin.site.register(PlantSettings)