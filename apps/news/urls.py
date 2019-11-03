from django.urls import path
from . import views

app_name = 'news' #应用命名空间，后面可以用来区分index

urlpatterns = [
    path('<int:news_id>/', views.news_detail, name='news.detail'),
    path('list/', views.news_list, name='news_list')
]