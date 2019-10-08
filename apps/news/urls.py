from django.urls import path
from . import views

app_name = 'news' #应用命名空间，后面可以用来区分index

urlpatterns = [
    path('', views.index, name='index')
]