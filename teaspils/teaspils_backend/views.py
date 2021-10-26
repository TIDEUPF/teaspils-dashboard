from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Student


def index(request):
    template:any = loader.get_template('main/index.html')
    context:set = {}
    return HttpResponse(template.render(context, request))

def login(request):
    return HttpResponse("Hello, world. You're at the login.")

def homeStudent(request, student_id:int):

    student:Student = Student.objects.get(pk=student_id)
    return HttpResponse(f"Hello, world. You're at the Student Home page for student named: {student.name}.")

def calendar(request, student_id:int):
    return HttpResponse(f"Hello, world. You're at the calendar page for {student_id}.")

def plantList(request, student_id:int):
    return HttpResponse(f"Hello, world. You're at the Plant List for {student_id}.")

def plantDetail(request, plant_id:int):
    return HttpResponse(f"Hello, world. You're at the detail of the plant {plant_id}.")

def plantHistory(request, plant_id:int):
    return HttpResponse(f"Hello, world. You're at the historical data of the plant {plant_id}.")

def observations(request): #,plant_id:int):
    template:any = loader.get_template('main/observations.html')
    context:set = {}
    return HttpResponse(template.render(context, request))
    #return HttpResponse(f"Hello, world. You're at Observations page {plant_id}.")

def measures(request):
    return HttpResponse("Hello, world. You're at the Measures page.")
