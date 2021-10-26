from django.urls import path

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
    path('plant/observations', views.observations, name='observations'),
    path('plant/<int:plant_id>/measurement', views.measures, name='measurement')
]