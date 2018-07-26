from django.urls import include, path
from . import views


app_name = 'blog'
urlpatterns = [
    path('', views.index, name='index'),
    path('front/site/list', views.sitelist, name='sitelist'),
    path('front/bg_class/list', views.bglist, name='bglist'),
    path('front/bgimg/list/<int:classid>', views.bgimglist, name='bgimglist'),
    path('front/bgimg/<int:id>', views.bgimg, name='bgimg'),
    path('front/animation/weather', views.weather, name='weather'),
    ]
