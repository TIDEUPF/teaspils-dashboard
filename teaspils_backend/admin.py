from django.contrib import admin
from .models import Center, Experiment, MeasureObservation, Measurement, Observation, PlantAdmin, PlantSettings, Student, Plant

# USER: root
# PASS: teaspils22

# Register your models here.
admin.site.register(Measurement)
admin.site.register(Observation)
admin.site.register(MeasureObservation)
admin.site.register(Student)
admin.site.register(Plant, PlantAdmin)
admin.site.register(Experiment)
admin.site.register(Center)
admin.site.register(PlantSettings)