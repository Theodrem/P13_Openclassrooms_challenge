from django.urls import path, include
from challenge.views import ChallengeViewSet, CategoryViewSet
from django.contrib import admin
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'challenge', ChallengeViewSet)
router.register(r'category', CategoryViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',  include(router.urls)),
    path('auth/', include('user.urls')),
    path('api-auth/', include('rest_framework.urls')),
]


