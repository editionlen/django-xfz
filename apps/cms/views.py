from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
#页面设计代码从https://adminlte.io/获取
# Create your views here.
@staff_member_required(login_url='index')
def index(request):
    return render(request, 'cms/index.html')

def WriteNewsView(request):
    return render(request, 'cms/write_news.html')