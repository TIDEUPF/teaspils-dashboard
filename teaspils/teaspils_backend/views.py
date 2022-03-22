import datetime
import json
from math import sin
from multiprocessing import context
from os import times
from pathlib import Path
from datetime import date, timezone
from zoneinfo import ZoneInfo

from django.http.response import Http404, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.contrib import messages
from django.core.files import File as DjangoFile
from django.core.files.images import ImageFile
from django.conf import settings as django_settings
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.csrf import csrf_exempt

from django.core.paginator import Paginator

from io import BytesIO, StringIO


from .utils import handle_uploaded_file

from .api import facade

from .models import Course, MeasureObservation, Measurement, Observation, Plant, PlantSettings, Student
from .forms import LoginForm, ObservationForm

@csrf_exempt
def index(request):

    if request.is_ajax():
        
        print(request)
        ajax_value = request.GET.get('value', '')

        if ajax_value != '':

            course_id = ajax_value
            course = Course.objects.filter(pk=course_id).first()
            if(course is None):
                return HttpResponse(json.dumps({'alias': _("No alias")})) 
            else:
                plant = Plant.objects.filter(course__pk=course.id).first()    
                if(plant is None):
                    return HttpResponse(json.dumps({'alias': _("No alias")})) 
                else:
                    return HttpResponse(json.dumps({'alias': plant.alias}))
            

    if request.method == 'POST':
        facade.ConnectionFacade.data = {}
        form:LoginForm = LoginForm(request.POST)

        if form.is_valid():
            course_id = form.cleaned_data['course_id']
            secret_word = form.cleaned_data['secret_word']

            print(course_id)
            course = Course.objects.filter(pk=course_id).first()

            if (not course is None): 
                is_valid = course.validateSecret(secret_word)

                #TODO: Implement real login system
                if is_valid:
                    try: 
                        plant = Plant.objects.filter(course__pk=course_id).first()
                        print(plant)
                        return HttpResponseRedirect(f'plant/{plant.id}/history')
                    except Exception as e:
                        print(e)
                        return HttpResponseRedirect('/teaspils')
                else:
                    messages.error(request, "Course credentials are not valid, try again.")
                    return render(request, 'main/index.html', {'form': form})
            else:
                messages.error(request, "Course not found!")
                return HttpResponseRedirect('/teaspils')
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

    observations = []
    if request.method == 'POST':
        form:ObservationForm = ObservationForm(request.POST, request.FILES)
        if form.is_valid():
            plant_id = form.cleaned_data['plant_id']
            name = form.cleaned_data['name']
            observation = form.cleaned_data['observation']
            attachedfile = None
            if 'attachedfile' in request.FILES.keys():
                attachedfile = request.FILES['attachedfile']
            else:
                attachedfile = BytesIO(open("teaspils_backend/static/img/no_image_jpg.jpg",'rb').read())
                attachedfile =  ImageFile(attachedfile, name='foo.jpg') 
            timestamp = datetime.datetime.now().astimezone(ZoneInfo('Europe/Madrid'))

            #saved_path:str = handle_uploaded_file(attachedfile, plant_id, timestamp, django_settings.STATIC_URL)
            saved_path:str = '/uploads'

            #img_file = DjangoFile(open(saved_path, mode='rb'), name=saved_path)
            

            if saved_path is not None:
                obs = Observation(plant_id=plant_id,
                                  author=name,
                                  text=observation,
                                  filePath= saved_path,
                                  image = attachedfile,
                                  timestamp=timestamp)
                obs.save()

                messages.success(request, "Observation saved successfully")

                observations = Observation.objects.filter(plant_id=plant_id).order_by("-timestamp")
                context:set = {'plant_id': plant_id, 'observations': observations}
                return HttpResponseRedirect('history', context)


    plant = Plant.objects.filter(pk=plant_id).first()
    con = facade.ConnectionFacade('http') #thingsb
    con.connect(plant.data_source)
    print("FROM STATIC: ", facade.ConnectionFacade.data)
    json_pretty = json.dumps(facade.ConnectionFacade.data, sort_keys=True, indent=4)

    messages.info(request, "Select a data pont on the chart to see the full visualization of the measurement!")

    #OBSERVATIONS:
    observations = Observation.objects.filter(plant_id=plant_id).order_by("-timestamp")

    paginator = Paginator(observations, 3)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 
                  template_name='main/historical.html', 
                  context={'plant_id' : plant_id,
                           'json_history': json_pretty,
                           'page_obj': page_obj})


@csrf_exempt
def observations(request, plant_id:int): #,plant_id:int):

    observations = []
    if request.method == 'POST':
        form:ObservationForm = ObservationForm(request.POST, request.FILES)
        if form.is_valid():
            plant_id = form.cleaned_data['plant_id']
            name = form.cleaned_data['name']
            observation = form.cleaned_data['observation']
            attachedfile = None
            if 'attachedfile' in request.FILES.keys():
                attachedfile = request.FILES['attachedfile']
            else:
                attachedfile = BytesIO(open("teaspils_backend/static/img/no_image_jpg.jpg",'rb').read())
                attachedfile =  ImageFile(attachedfile, name='foo.jpg') 
            timestamp = datetime.datetime.now().astimezone(ZoneInfo('Europe/Madrid'))

            #saved_path:str = handle_uploaded_file(attachedfile, plant_id, timestamp, django_settings.STATIC_URL)
            saved_path:str = '/uploads'

            #img_file = DjangoFile(open(saved_path, mode='rb'), name=saved_path)
            

            if saved_path is not None:
                obs = Observation(plant_id=plant_id,
                                  author=name,
                                  text=observation,
                                  filePath= saved_path,
                                  image = attachedfile,
                                  timestamp=timestamp)
                obs.save()

                messages.success(request, "Observation saved successfully")

                observations = Observation.objects.filter(plant_id=plant_id).order_by("-timestamp")
                context:set = {'plant_id': plant_id, 'observations': observations}
                return HttpResponseRedirect('observations', context)
            else:
                messages.error(request, "Error saving the observation")
                return(Http404())

            print(f"{name} makes this observation: {observation} about plant {plant_id} with file {attachedfile}")

    else:
        observations = Observation.objects.filter(plant_id=plant_id).order_by("-timestamp")
        print(observations)


    template:any = loader.get_template('main/observations.html')
    context:set = {'plant_id': plant_id, 'observations': observations}
    return HttpResponse(template.render(context, request))
    #return HttpResponse(f"Hello, world. You're at Observations page {plant_id}.")

@csrf_exempt
def measureObservations(request, plant_id:int, ts:str):
    observations = []
    if request.method == 'POST':
        print("FROM POST ENTERING", ts)
        form:ObservationForm = ObservationForm(request.POST, request.FILES)
        print(form)
        if form.is_valid():
            print("POST IS VALID", ts)
            plant_id = form.cleaned_data['plant_id']
            name = form.cleaned_data['name']
            observation = form.cleaned_data['observation']
            attachedfile = None
            if 'attachedfile' in request.FILES.keys():
                attachedfile = request.FILES['attachedfile']
            else:
                attachedfile = BytesIO(open("teaspils_backend/static/img/no_image_jpg.jpg",'rb').read())
                attachedfile =  ImageFile(attachedfile, name='foo.jpg') 

            print(attachedfile)
            #2022-02-10%2019:08:45
            timestamp = datetime.datetime.strptime(ts, "%Y-%m-%d %H:%M:%S")
            saved_ts = timestamp.astimezone(ZoneInfo('Europe/Madrid'))
            saved_path:str = '/uploads'

            #img_file = DjangoFile(open(saved_path, mode='rb'), name=saved_path)
            if saved_path is not None:
                obs = MeasureObservation(plant_id=plant_id,
                                  author=name,
                                  text=observation,
                                  filePath= saved_path,
                                  image = attachedfile,
                                  timestamp=saved_ts)
                obs.save()

                messages.success(request, "Observation saved successfully")
                observations = MeasureObservation.objects.filter(plant_id=plant_id, timestamp=saved_ts).order_by("-timestamp")

                plant = Plant.objects.filter(pk=plant_id).first()
                plant_alias = plant.alias

                context:set = {'plant_id': plant_id, 
                               'observations': observations,
                               'timestamp' : ts,
                               'alias' : plant_alias}
                return HttpResponseRedirect(str(timestamp), context)
            else:
                messages.error(request, "Error saving the observation")
                return(Http404())

            print(f"{name} makes this observation: {observation} about plant {plant_id} with file {attachedfile}")

    else:
        print("### BY GET ###", ts)
        timestamp = datetime.datetime.strptime(ts, "%Y-%m-%d %H:%M:%S")
        # print(timestamp)
        saved_ts = timestamp.astimezone(ZoneInfo('Europe/Madrid'))
        # 2022-02-10 18:48:35+00:00
        observations = MeasureObservation.objects.filter(plant_id=plant_id, timestamp=saved_ts).order_by("-timestamp")

        for o in observations:
            print(o.image)

    plant = Plant.objects.filter(pk=plant_id).first()
    plant_alias = plant.alias

    template:any = loader.get_template('main/measureobs.html')
    context:set = {'plant_id': plant_id, 
                   'observations': observations,
                   'timestamp' : ts,
                   'alias' : plant_alias}
    return HttpResponse(template.render(context, request))


def measures(request, plant_id:int, ts:str):
    #2021-11-18%2022:48:02.884
    origin_data = facade.ConnectionFacade.data

    single_measure = {}
    for m in origin_data:
        # print(m['Timestamp'],"--" ,ts)
        if m['Timestamp'] == ts:
            single_measure = m
    
    single_measure = json.dumps(single_measure)

    plant_settings = PlantSettings.objects.filter(plant_id=plant_id).last()
    plant = Plant.objects.filter(pk=plant_id).first()
    plant_alias = plant.alias
    # plant_settings = plant_settings.toJSON()
    return render(request,
                  template_name='main/measurement.html',
                  context={'timestamp': ts, 
                           'plant_id': plant_id,
                           'alias' : plant_alias,
                           'measure' : single_measure,
                           'lowT' : plant_settings.low_temperature,
                           'highT' : plant_settings.high_temperature,
                           'lowN' : plant_settings.low_noise,
                           'highN' : plant_settings.high_noise,
                           'lowC' : plant_settings.low_co2,
                           'highC' : plant_settings.high_co2,
                           'lowH' : plant_settings.low_humidity,
                           'highH' : plant_settings.high_humidity,
                           'lowI' : plant_settings.low_light,
                           'highI' : plant_settings.high_light
                           })

@csrf_exempt
def singleMeasure(request, plant_id:int, obj:str):
    if  request.method == 'GET':
    
        single_measure = json.loads(obj)
    
        plant_settings = PlantSettings.objects.filter(plant_id=plant_id).last()
        plant = Plant.objects.filter(pk=plant_id).first()
        plant_alias = plant.alias

        return_context = {'timestamp': single_measure['timestamp'], 
                           'plant_id': plant_id,
                           'alias' : plant_alias,
                           'measure' : single_measure,
                           'lowT' : plant_settings.low_temperature,
                           'highT' : plant_settings.high_temperature,
                           'lowN' : plant_settings.low_noise,
                           'highN' : plant_settings.high_noise,
                           'lowC' : plant_settings.low_co2,
                           'highC' : plant_settings.high_co2,
                           'lowH' : plant_settings.low_humidity,
                           'highH' : plant_settings.high_humidity,
                           'lowI' : plant_settings.low_light,
                           'highI' : plant_settings.high_light
                        }

        print(plant_alias)
        print(return_context)
        
        # plant_settings = plant_settings.toJSON()
        return render(request, template_name='main/measurement.html', context=return_context)

        # return render(request,
        #           template_name='main/measurement.html',
        #           )
                
@csrf_exempt
def saveSettings(request):

    try:
        settings = PlantSettings(low_temperature = request.GET['lowT'],
                                high_temperature = request.GET['highT'],
                                low_noise = request.GET['lowN'],
                                high_noise = request.GET['highN'],
                                low_co2 = request.GET['lowC'],
                                high_co2 = request.GET['highC'],
                                low_humidity = request.GET['lowH'],
                                high_humidity = request.GET['highH'],
                                low_light = request.GET['lowI'],
                                high_light = request.GET['highI'],
                                plant_id = request.GET['plant_id']
                                )

        settings.save()

        print("Settings saved successfully")
        return_data = {'success' : True}
    except Exception as e:
        return_data = {'success' : False}
        print("Settings could not be saved", e)

    return JsonResponse(return_data)
    
