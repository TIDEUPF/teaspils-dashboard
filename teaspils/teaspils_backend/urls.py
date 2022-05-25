from django.urls import path
from django.urls import include, re_path

from . import views

urlpatterns:list = [
    path('', views.index, name='index'),
    path('plant/<int:plant_id>/history', views.plantHistory, name='plantDetail'),
    #path('plant/<int:plant_id>/observations', views.observations, name='observations'),
    path('plant/<int:plant_id>/observations', views.observations, name='observations'),
    path('plant/<int:plant_id>/measurement/<str:ts>', views.measures, name='measurement'),
    path('plant/<int:plant_id>/measures/<str:obj>', views.singleMeasure, name='singleMeasure'),
    path('plant/<int:plant_id>/measureobs/<str:ts>', views.measureObservations, name='measureObservations'),
    path('ajax/savesettings', views.saveSettings, name='saveSettings'),
    re_path(r'^i18n/', include('django.conf.urls.i18n')),
]