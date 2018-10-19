from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
import django
if django.VERSION >= (2, 0):
    from django.urls import path, include
else:
    from django.conf.urls import url, include

if django.VERSION >= (1, 9):
    web_url = include(("web.urls", "web"), namespace="web")
else:
    web_url = include("web.urls", "web", "web")

if django.VERSION >= (2, 0):
    urlpatterns = [
            path('admin/', admin.site.urls),
            path('', web_url),
    ]
else:
    urlpatterns = [
            url(r'^admin/', include(admin.site.urls)),
            url(r'^', web_url),
    ]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
