import json
from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt

from .api import facade

from .models import Plant, Student
from .forms import LoginForm

@csrf_exempt
def index(request):

    if request.method == 'POST':
        form:LoginForm = LoginForm(request.POST)

        if form.is_valid():
            course_id = form.cleaned_data['course_id']
            try: 
                plant = Plant.objects.filter(course__pk=course_id).first()
                print(plant)
            except Exception as e:
                print(e)
                return HttpResponseRedirect('/teaspils')

            return HttpResponseRedirect(f'plant/{plant.id}/history')
        else:
            print(form.errors)
            print("Formulario no válido")
            return HttpResponseRedirect('/teaspils')


    else:
        form = LoginForm()

        return render(request, 'main/index.html', {'form': form})


    # template:any = loader.get_template('main/index.html')
    # context:set = {}
    # return HttpResponse(template.render(context, request))

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

@csrf_exempt
def plantHistory(request, plant_id:int):

    plant = Plant.objects.filter(pk=plant_id).first()
    con = facade.ConnectionFacade('http')
    json_response = con.connect(plant.data_source)
    # Conectar con la fuente de datos externa.
    # Esta parte en realidad no va acá. Debe haber una tarea corriendo que se  conecte cada X sminutos.
    # En esta sección debe aparecer la información que ya está guardada en la base de datos.
    # Crear información mock para probar.
    json_pretty = json.dumps(json_response, sort_keys=True, indent=4)
    return HttpResponse(json_pretty,content_type="application/json")



def observations(request): #,plant_id:int):
    template:any = loader.get_template('main/observations.html')
    context:set = {}
    return HttpResponse(template.render(context, request))
    #return HttpResponse(f"Hello, world. You're at Observations page {plant_id}.")

def measures(request):
    return HttpResponse("Hello, world. You're at the Measures page.")
