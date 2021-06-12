from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from challenge.views import ChallengeView, CategoryView, GetChallengeView

urlpatterns = [
    path('challenges/', ChallengeView.as_view(), name='challenge-create'),
    path('', GetChallengeView.as_view(), name='challenge-list'),
    path('category/', CategoryView.as_view(), name='category-create'),
    path('actuallity/', ChallengeView.as_view(), name='actuallity'),
    #path(actuallity/<int:id>
    #path(my_challenges/)
    #path(best_players/)
]

urlpatterns = format_suffix_patterns(urlpatterns)