from django.urls import path
from django.urls import include, re_path

from . import views

urlpatterns:list = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('student/<int:student_id>', views.homeStudent, name='home'),
    path('student/<int:student_id>/calendar', views.calendar, name='calendar'),
    path('student/<int:student_id>/plants', views.plantList, name='plantList'),
    path('plant/<int:plant_id>/detail', views.plantDetail, name='plantDetail'),
    path('plant/<int:plant_id>/history', views.plantHistory, name='plantDetail'),
    #path('plant/<int:plant_id>/observations', views.observations, name='observations'),
    path('plant/<int:plant_id>/observations', views.observations, name='observations'),
    path('plant/<int:plant_id>/measurement/<str:ts>', views.measures, name='measurement'),
    path('plant/<int:plant_id>/measures/<str:obj>', views.singleMeasure, name='singleMeasure'),
    path('plant/<int:plant_id>/measureobs/<str:ts>', views.measureObservations, name='measureObservations'),
    path('plant/<int:plant_id>/history/actionUrl', views.sendAlert, name='actionUrl'),
    path('ajax/savesettings', views.saveSettings, name='saveSettings'),
    re_path(r'^i18n/', include('django.conf.urls.i18n')),
]