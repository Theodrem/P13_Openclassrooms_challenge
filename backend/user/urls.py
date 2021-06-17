from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt import views as jwt_views
from user.views import RegisterView, LogoutView, UserViewSet


urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout_view'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('dashboard/', UserViewSet.as_view(), name="dashboard")

]

urlpatterns = format_suffix_patterns(urlpatterns)


