from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from challenge.views import ChallengeViewSet, CategoryViewSet

urlpatterns = [
    path('challenge/', ChallengeViewSet.as_view(), name='challenge-list'),
    path('challenge/<int:pk>/', ChallengeViewSet.as_view(), name='challenge-detail'),
    path('category/', CategoryViewSet.as_view(), name='category-list'),
    #path(actuallity/<int:id>
    #path(my_challenges/)
    #path(best_players/)
    #path(/)
]

urlpatterns = format_suffix_patterns(urlpatterns)