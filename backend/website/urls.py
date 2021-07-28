from django.urls import path, include
from django.contrib import admin


urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/', include('user.urls')),
    path('api/', include('challenge.urls')),
    path('api/', include('utils.urls')),

]


