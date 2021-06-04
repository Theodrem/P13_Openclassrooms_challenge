from django.contrib import admin
from django.urls.conf import include
from .models import Category, Challenge

admin.site.register(Challenge)
admin.site.register(Category)