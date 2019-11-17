from django.shortcuts import render
from .models import News, NewsCategory
from django.conf import settings
from utils import restful
from .serializers import NewsSerializer, CommentSerializer
from django.http import Http404
from .forms import PublicCommentForm
from .models import Comment, Banner
from django.contrib.auth.decorators import login_required
from apps.xfzauth.decorators import xfz_login_required
# Create your views here.

def index(request):
    count = settings.ONE_PAGE_NEWS_COUNT
    newses = News.objects.select_related('category', 'author').order_by('-pub_time')[0:count]
    categories = NewsCategory.objects.all()
    context = {
        'newses': newses,
        'categories': categories,
        'banners': Banner.objects.all()
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
        news = News.objects.select_related('category', 'author').prefetch_related("comments__author").get(pk=news_id)
        context = {'news':news}
        return render(request, 'news/news_detail.html', context=context)
    except News.DoesNotExist:
        raise Http404

@xfz_login_required
def public_comment(request):
    form = PublicCommentForm(request.POST)
    if form.is_valid():
        news_id = form.cleaned_data.get('news_id')
        content = form.cleaned_data.get('content')
        news = News.objects.get(pk=news_id)
        comment = Comment.objects.create(content=content, news=news, author=request.user)
        serizlize = CommentSerializer(comment)
        return restful.result(data=serizlize.data)
    else:
        return restful.params_error(message=form.get_errors())

def search(request):
    return render(request, 'search/search.html')