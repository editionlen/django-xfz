from django.shortcuts import render
from .models import News, NewsCategory
from django.conf import settings
from utils import restful
from .serializers import NewsSerializer
# Create your views here.

def index(request):
    count = settings.ONE_PAGE_NEWS_COUNT
    newses = News.objects.order_by('-pub_time')[0:count]
    categories = NewsCategory.objects.all()
    context = {
        'newses': newses,
        'categories': categories
    }
    return render(request, 'news/index.html', context=context)

def news_list(request):
    page = int(request.GET.get('p', 1))
    start = (page-1)*settings.ONE_PAGE_NEWS_COUNT
    end = start + settings.ONE_PAGE_NEWS_COUNT
    #从query对象转为json
    newes = News.objects.order_by('-pub_time')[start:end]
    serializer = NewsSerializer(newes, many=True)
    data = serializer.data
    return restful.result(data=data)

def news_detail(request, news_id):
    return render(request, 'news/news_detail.html')

def search(request):
    return render(request, 'search/search.html')