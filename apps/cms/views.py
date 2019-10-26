from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.views.generic import View
#页面设计代码从https://adminlte.io/获取
# Create your views here.
@staff_member_required(login_url='index')
def index(request):
    return render(request, 'cms/index.html')

class WriteNewsView(View):
    def get(self,request):
        return render(request, 'cms/write_news.html')

def news_category(request):
    return render(request, 'cms/news_category.html')