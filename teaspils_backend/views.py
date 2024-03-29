import ast
import datetime
import html
from dateutil import parser 
import json
from typing import List
from zoneinfo import ZoneInfo

from django.http.response import Http404, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.contrib import messages
from django.core.files.images import ImageFile
from django.utils.translation import gettext_lazy as _
from django.views.decorators.csrf import csrf_exempt

from django.core.paginator import Paginator

from .api import facade

from .models import Experiment, MeasureObservation, Observation, Plant, PlantSettings
from .forms import LoginForm, MeasureObservationForm, ObservationForm

@csrf_exempt
def index(request):

    if request.accepts('text/html'):
        
        print(request)
        ajax_value = request.GET.get('value', '')

        if ajax_value != '':

            partner_name = ajax_value
            experiment = Experiment.objects.filter(partner=partner_name).first()
            if(experiment is None):
                return HttpResponse(json.dumps({'alias': "N"})) 
            else:
                return HttpResponse(json.dumps({'alias': "Y"}))
            

    if request.method == 'POST':
        facade.ConnectionFacade.data = {}
        form:LoginForm = LoginForm(request.POST)

        if form.is_valid():
            partner_name = form.cleaned_data['partner_name']
            secret_word = form.cleaned_data['secret_word']

            experiment = Experiment.objects.filter(partner=partner_name).first()

            if (not experiment is None): 
                is_valid = experiment.validateSecret(secret_word)

                #TODO: Implement real login system
                if is_valid:
                    try: 
                        plant = Plant.objects.filter(experiment__pk=experiment.id).first()
                        print(plant)
                        return HttpResponseRedirect(f'plant/{plant.id}/history')
                    except Exception as e:
                        print(e)
                        return HttpResponseRedirect('/teaspils')
                else:
                    messages.error(request, "Experiment credentials are not valid, try again.")
                    return render(request, 'main/index.html', {'form': form})
            else:
                messages.error(request, "Partner not found!")
                return HttpResponseRedirect('/teaspils')
        else:
            print(form.errors)
            print("Not valid form")
            return HttpResponseRedirect('/teaspils')


    else:
        form = LoginForm()

        return render(request, 'main/index.html', {'form': form})


    # template:any = loader.get_template('main/index.html')
    # context:set = {}
    # return HttpResponse(template.render(context, request))

@csrf_exempt
def plantHistory(request, plant_id:int):

    print("ENTERING PLANT HISTORY VIEW")
    print(request.POST)

    observations:List = []

    if (request.method == 'POST') and (request.POST['name'] == 'dataset_upload'):
        print("ENTERING FROM DATASET")

        plant = Plant.objects.filter(pk=plant_id).first()
        plant.last_dataset = bytes(request.POST['file'], 'utf-8')
        plant.save()

    if (request.method == 'POST') and (('observation_post' in request.POST) and 
                                       (request.POST['observation_post'])):
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
                                #   filePath= saved_path,
                                  image = attachedfile,
                                  timestamp=timestamp)
                obs.save()

                messages.success(request, "Observation saved successfully")

                observations = Observation.objects.filter(plant_id=plant_id).order_by("-timestamp")
                context:set = {'plant_id': plant_id, 'observations': observations}
                return HttpResponseRedirect('history', context)


    # Connect to datasource
    # Will be routed to dummy data until real sources became availables.
    # plant = Plant.objects.filter(pk=plant_id).first()
    # con = facade.ConnectionFacade('dummy') #or thingsb
    # con.connect(plant.data_source)
    # print("FROM STATIC: ", facade.ConnectionFacade.data)
    # json_pretty = json.dumps(facade.ConnectionFacade.data, sort_keys=True, indent=4)
    plant = Plant.objects.filter(pk=plant_id).first()

    if plant.last_dataset == None:
        json_pretty = json.dumps({})

    str_dataset = ''

    # str_dataset = plant.last_dataset.decode('utf-8')
    # str_dataset = "\"" + str_dataset + "\""
    # str_dataset = str_dataset.encode('latin-1')
    
    #print(str_dataset)

    # json_pretty = json.dumps(str_dataset)

    messages.info(request, "Select a data pont on the chart to see the full visualization of the measurement!")

    #OBSERVATIONS:
    observations = Observation.objects.filter(plant_id=plant_id).order_by("-timestamp")

    paginator = Paginator(observations, 3)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 
                  template_name='main/historical.html', 
                  context={'plant_id' : plant_id,
                           'json_history': str_dataset,
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
                                #   filePath= saved_path,
                                  image = attachedfile,
                                  timestamp=timestamp)
                obs.save()

                messages.success(request, "Observation saved successfully")

                observations = Observation.objects.filter(plant_id=plant_id).order_by("-timestamp")

                paginator = Paginator(observations, 3)
                page_number = request.GET.get('page')
                page_obj = paginator.get_page(page_number)

                context:set = {'plant_id': plant_id, 'page_obj': page_obj}
                return HttpResponseRedirect('observations', context)
            else:
                messages.error(request, "Error saving the observation")
                return(Http404())

            print(f"{name} makes this observation: {observation} about plant {plant_id} with file {attachedfile}")

    else:
        #OBSERVATIONS:
        observations = Observation.objects.filter(plant_id=plant_id).order_by("-timestamp")

        paginator = Paginator(observations, 3)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        return render(request,
                      template_name='main/observations.html',
                      context={
                          'plant_id' : plant_id,
                          'page_obj' :  page_obj})


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
            # saved_path:str = '/uploads'

            #img_file = DjangoFile(open(saved_path, mode='rb'), name=saved_path)
            if saved_path is not None:
                obs = MeasureObservation(plant_id=plant_id,
                                  author=name,
                                  text=observation,
                                #   filePath= saved_path,
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
                # "/teaspils/plant/"+pid+"/measures/" + sm_json
                return HttpResponseRedirect("/teaspils/plant/"+plant_id+"/measures/" + sm_json)
            else:
                messages.error(request, "Error saving the observation")
                return(Http404())

            print(f"{name} makes this observation: {observation} about plant {plant_id} with file {attachedfile}")

    else:
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
                  context={'timestamp'  : ts, 
                           'plant_id'   : plant_id,
                           'alias'      : plant_alias,
                           'measure'    : single_measure,
                           'lowT'       : plant_settings.low_temperature,
                           'highT'      : plant_settings.high_temperature,
                           'lowSoilHum' : plant_settings.low_soilHum,
                           'highSoilHum': plant_settings.high_soilHum,
                           'lowSoilTemp': plant_settings.low_soilTemp,
                           'highSoilTemp': plant_settings.high_soilTemp,
                           'lowN'       : plant_settings.low_noise,
                           'highN'      : plant_settings.high_noise,
                           'lowC'       : plant_settings.low_co2,
                           'highC'      : plant_settings.high_co2,
                           'lowH'       : plant_settings.low_humidity,
                           'highH'      : plant_settings.high_humidity,
                           'lowI'       : plant_settings.low_light,
                           'highI'      : plant_settings.high_light
                           })

@csrf_exempt
def singleMeasure(request, plant_id:int, obj:str):
    """
    obj is the stringyfied json of the selected measure.
    obj: {"timestamp":"2022-02-08 20:25:35",
          "humidity":26,"light":9,"co2":351.40909090909093,
          "soilHumidity":39.08133971291866,"temperature":25}
    """

    observations:List = []

    if  request.method == 'GET':

        print("ENTERIG BY GET:")
        print(obj)
        single_measure = json.loads(obj)
    
        plant_settings = PlantSettings.objects.filter(plant_id=plant_id).last()
        plant = Plant.objects.filter(pk=plant_id).first()
        plant_alias = plant.alias

        measure_ts = single_measure['timestamp']

        #OBSERVATIONS:
        observations = MeasureObservation.objects.filter(plant_id=plant_id, measure_timestamp=measure_ts).order_by("-timestamp")

        paginator = Paginator(observations, 3)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        return_context = {'timestamp': single_measure['timestamp'], 
                           'plant_id': plant_id,
                           'alias' : plant_alias,
                           'measure' : single_measure,
                           'lowT' :  0 if plant_settings is None else plant_settings.low_temperature,
                           'highT' : 100 if plant_settings is None else plant_settings.high_temperature,
                           'lowST' :  0 if plant_settings is None else plant_settings.low_soilTemp,
                           'highST' : 100 if plant_settings is None else plant_settings.high_soilTemp,
                           'lowSH' :  0 if plant_settings is None else plant_settings.low_soilHum,
                           'highSH' : 100 if plant_settings is None else plant_settings.high_soilHum,
                        #    'lowN' : 0 if plant_settings is None else plant_settings.low_noise,
                        #    'highN' : 100 if plant_settings is None else plant_settings.high_noise,
                           'lowC' : 0 if plant_settings is None else plant_settings.low_co2,
                           'highC' : 100 if plant_settings is None else plant_settings.high_co2,
                           'lowH' : 0 if plant_settings is None else plant_settings.low_humidity,
                           'highH' : 100 if plant_settings is None else plant_settings.high_humidity,
                           'lowI' : 0 if plant_settings is None else plant_settings.low_light,
                           'highI' : 100 if plant_settings is None else plant_settings.high_light,
                           'page_obj': page_obj
                        }

        
        # plant_settings = plant_settings.toJSON()
        return render(request, template_name='main/measurement.html', context=return_context)

    elif  request.method == 'POST':
        print("FROM POST ENTERING")
        single_measure = json.loads(obj)
        form:MeasureObservationForm = MeasureObservationForm(request.POST, request.FILES)
        print(form)
        if form.is_valid():
            print("POST IS VALID", single_measure)
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
            measure_timestamp = parser.parse(single_measure['timestamp'])
            # measure_timestamp = datetime.datetime.strptime(single_measure['timestamp'], "%Y-%m-%d %H:%M:%S.%f")
            saved_ts = measure_timestamp.astimezone(ZoneInfo('Europe/Madrid'))

            real_timestamp = datetime.datetime.now()
            

            #img_file = DjangoFile(open(saved_path, mode='rb'), name=saved_path)
            obs = MeasureObservation(plant_id=plant_id,
                                author=name,
                                text=observation,
                                image = attachedfile,
                                measure_timestamp = saved_ts,
                                timestamp= real_timestamp)
            obs.save()

            messages.success(request, "Observation saved successfully")
            observations = MeasureObservation.objects.filter(plant_id=plant_id, timestamp=saved_ts).order_by("-timestamp")

            plant = Plant.objects.filter(pk=plant_id).first()
            plant_alias = plant.alias

            context:set = {'plant_id': plant_id, 
                            'observations': observations,
                            'timestamp' : saved_ts,
                            'alias' : plant_alias}

            single_measure = str(single_measure).replace("\'", "\"")

            return HttpResponseRedirect("/teaspils/plant/"+str(plant_id)+"/measures/" + str(single_measure))


                
@csrf_exempt
def saveSettings(request):

    try:
        settings = PlantSettings(low_temperature = request.GET['lowT'],
                                high_temperature = request.GET['highT'],
                                low_soilTemp = request.GET['lowST'],
                                high_soilTemp = request.GET['highST'],
                                low_soilHum = request.GET['lowSH'],
                                high_soilHum = request.GET['highSH'],
                                # low_noise = request.GET['lowN'],
                                # high_noise = request.GET['highN'],
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
    
