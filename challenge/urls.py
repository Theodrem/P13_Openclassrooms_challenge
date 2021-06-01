from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from challenge.views import ChallengeView, CategoryView

urlpatterns = [
    path('challenge/', ChallengeView.as_view(), name='challenge-list'),
    path('category/', CategoryView.as_view(), name='category-list'),
    #path('add_challenge/', ChallengeUserView.as_view(), name='add_challenge'),
    #path(actuallity/<int:id>
    #path(my_challenges/)
    #path(best_players/)
]

urlpatterns = format_suffix_patterns(urlpatterns)