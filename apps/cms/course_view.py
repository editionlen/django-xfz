from django.shortcuts import render

def pub_course(request):
    return render(request, 'cms/pub_course.html')