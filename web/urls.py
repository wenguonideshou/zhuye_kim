from . import views
import django
if django.VERSION >= (2, 0):
    from django.urls import include, path
else:
    from django.conf.urls import include, url

app_name = 'blog'
if django.VERSION >= (2, 0):
    urlpatterns = [
            path('', views.index, name='index'),
            path('front/site/list', views.sitelist, name='sitelist'),
            path('front/bg_class/list', views.bglist, name='bglist'),
            path('front/bgimg/list/<int:classid>', views.bgimglist, name='bgimglist'),
            path('front/bgimg/<int:id>', views.bgimg, name='bgimg'),
            path('front/animation/weather', views.weather, name='weather'),
            ]
else:
    urlpatterns = [
            url(r'^$', views.index, name='index'),
            url(r'^front/site/list', views.sitelist, name='sitelist'),
            url(r'^front/bg_class/list', views.bglist, name='bglist'),
            url(r'^front/bgimg/list/(?P<classid>.+)', views.bgimglist, name='bgimglist'),
            url(r'^front/bgimg/(?P<id>.+)', views.bgimg, name='bgimg'),
            url(r'^front/animation/weather', views.weather, name='weather'),
            ]
