from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from challenge.views import ChallengeView, CategoryView, UserAskingView

urlpatterns = [
    path('challenges/', ChallengeView.as_view(), name='challenge-list'),
    path('actuallity/', ChallengeView.as_view(), name='actuallity'),
    path('profile/<int:id>', UserAskingView.as_view(), name='profile'),
    #path(actuallity/<int:id>)
    #path(my_challenges/)
    #path(best_players/)
]

urlpatterns = format_suffix_patterns(urlpatterns)