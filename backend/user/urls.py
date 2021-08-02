from django.urls import path
from django.conf.urls import url, include
from rest_framework_simplejwt import views as jwt_views
from user.views import RegisterView, LogoutView, UserView, GroupView, PostView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'profile', UserView),
router.register(r'group', GroupView),
router.register(r'post', PostView),

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout_view'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    url(r'^password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),   
]



urlpatterns += router.urls