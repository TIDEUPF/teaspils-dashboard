from django.urls import include, path
from django.conf.urls import url

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
    path('ajax/savesettings', views.saveSettings, name='saveSettings'),
    url(r'^i18n/', include('django.conf.urls.i18n')),
]