from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from user.views import RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    #path('dashboard/<int:pk>',)
]

urlpatterns = format_suffix_patterns(urlpatterns)
