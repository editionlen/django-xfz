from django.contrib.auth import login,logout, authenticate
from django.views.decorators.http import require_POST
from .forms import LoginForm
from django.http import JsonResponse
from utils import restful
from django.shortcuts import redirect,reverse
from utils.captcha.xfzcaptcha import Captcha
from io import BytesIO
from django.http import HttpResponse
from utils.aliyunsdk import aliyunsms
from utils import restful

@require_POST
def login_view(request):
    form = LoginForm(request.POST)
    if form.is_valid():
        telephone = form.cleaned_data.get("telephone")
        password = form.cleaned_data.get("password")
        remember = form.cleaned_data.get("remember")
        user = authenticate(request, username=telephone, password=password)
        if user:
            if user.is_active:
                login(request, user)
                if remember:
                    request.session.set_expiry(None)
                else:
                    request.session.set_expiry(0)
                return restful.ok()
            else:
                return restful.unauth(message="您的账号已经被冻结")
        else:
            return restful.params_error(message="手机号或者密码错误")
    else:
        errors = form.get_errors()
        return restful.params_error(message=errors)

def logout_view(request):
    logout(request)
    return redirect(reverse('index'))

def img_captcha(request):
    text, image = Captcha.gene_code()
    out = BytesIO()
    image.save(out, 'png')
    out.seek(0)

    response = HttpResponse(content_type='image/png')
    response.write(out.read())
    response['Content-length']=out.tell()
    return response

def sms_captcha(request):
    telephone = request.GET.get('telephone')
    code = Captcha.gene_text()
    result = aliyunsms.send_sms(telephone, code)
    print(result)
    return restful.ok()
