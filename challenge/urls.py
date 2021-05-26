from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from challenge import views

urlpatterns = [
    path('challenge/', views.ChallengeViewSet.as_view(), name='challenge-list'),
    path('challenge/<int:pk>/', views.ChallengeViewSet.as_view(), name='challenge-detail'),
    path('category/', views.CategoryViewSet.as_view(), name='category-list'),
]

urlpatterns = format_suffix_patterns(urlpatterns)