from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from .models import Site, Category, SmallCategory, BackGround, BackGroundCategory


def index(request):
    outer_categorys = Category.objects.filter(guonei=0).all()
    inner_categorys = Category.objects.filter(guonei=1).all()
    return render(request, 'web/index.html', locals())


@csrf_exempt
@require_POST
def sitelist(request):
    classId = request.POST['classId']
    category = Category.objects.filter(id=classId).first()
    sites_result = {"dataResult": []}
    small_categorys = SmallCategory.objects.filter(category=category).all().values("id", "name")
    for small_category in small_categorys:
        sites = Site.objects.filter(smallcategory=small_category.get('id')).all().values()
        c = {"id": small_category.get('id'), "className": small_category.get('name'), "description": small_category.get('name'), "siteVos": []}
        for site in sites:
            if site.get('id') and small_category.get('id'):
                a = {"id": site.get('id'), "siteName": site.get('name'), "siteUrl": site.get('true_url'), "logoResourceId": site.get('image_url')}
                c["siteVos"].append(a)
        sites_result['dataResult'].append(c)
    response = JsonResponse(sites_result, safe=False)
    return response


@csrf_exempt
@require_POST
def bglist(request):
    bglist = []
    bg_categorys = BackGroundCategory.objects.all().values("id", "name")
    for bg_category in bg_categorys:
        bg = {"id": bg_category.get('id'), "className": bg_category.get('name'), "description": bg_category.get('name')}
        bglist.append(bg)
    response = JsonResponse(bglist, safe=False)
    return response


@csrf_exempt
@require_POST
def bgimglist(request, classid):
    backgroundcategory = BackGroundCategory.objects.filter(id=classid).first()
    bgimglist = []
    backgrounds = BackGround.objects.filter(backgroundcategory=backgroundcategory).all().values("id", "name", "backgroundcategory", "preview_url")
    for background in backgrounds:
        a = {"id": background.get('id'), "bgName": background.get('name'), "bgType": background.get('backgroundcategory'), "previewResourceId": background.get('preview_url')}
        bgimglist.append(a)
    response = JsonResponse(bgimglist, safe=False)
    return response


@csrf_exempt
@require_POST
def bgimg(request, id):
    background = BackGround.objects.filter(id=id).all().values("image_url")[0].get('image_url')
    bgimg = 'media/'+background
    response = HttpResponse(bgimg, content_type='application/json')
    return response


@require_GET
def weather(request):
    response = JsonResponse({'ok': 1})
    return response

