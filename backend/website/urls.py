from django.urls import path, include
from django.contrib import admin
from django.http import HttpResponse
from django.shortcuts import render


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('', include('challenge.urls')),
]


