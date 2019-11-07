from django.shortcuts import render
from .models import News, NewsCategory
from django.conf import settings
from utils import restful
from .serializers import NewsSerializer
from django.http import Http404
# Create your views here.

def index(request):
    count = settings.ONE_PAGE_NEWS_COUNT
    newses = News.objects.select_related('category', 'author').order_by('-pub_time')[0:count]
    categories = NewsCategory.objects.all()
    context = {
        'newses': newses,
        'categories': categories
    }
    return render(request, 'news/index.html', context=context)

def news_list(request):
    page = int(request.GET.get('p', 1))
    category_id = int(request.GET.get('category_id', 0))
    start = (page-1)*settings.ONE_PAGE_NEWS_COUNT
    end = start + settings.ONE_PAGE_NEWS_COUNT
    #从query对象转为json
    if category_id == 0:
        newes = News.objects.select_related('category', 'author').all()[start:end]
    else:
        newes = News.objects.select_related('category', 'author').filter(category__id=category_id)[start:end]
    serializer = NewsSerializer(newes, many=True)
    data = serializer.data
    return restful.result(data=data)

def news_detail(request, news_id):
    try:
        news = News.objects.select_related('category', 'author').get(pk=news_id)
        context = {'news':news}
        return render(request, 'news/news_detail.html', context=context)
    except:
        raise Http404

def search(request):
    return render(request, 'search/search.html')