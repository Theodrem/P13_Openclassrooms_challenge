from django.urls import path, include
from challenge.views import ChallengeViewSet, CategoryViewSet, UserViewSet
from django.contrib import admin
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'challenge', ChallengeViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'user', UserViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',  include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
    ]
