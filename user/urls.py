from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_auth.views import PasswordResetConfirmView, LoginView, LogoutView, PasswordResetView, PasswordChangeView

urlpatterns = [
    path('login', LoginView.as_view(), name='auth_login'),
    path('logout', LogoutView.as_view(), name='rest-logout'),
    path('password/reset/confirm/<uidb64>/<token>',
         PasswordResetConfirmView.as_view(), name='auth_password_reset_confirm'),
    path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('password/change/', PasswordResetView.as_view(), name='rest_password_change'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
