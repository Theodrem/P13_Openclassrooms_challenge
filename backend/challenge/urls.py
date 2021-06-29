from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from challenge.views import ChallengeView, AddChallengeView, UserView

urlpatterns = [
    path('challenges/', ChallengeView.as_view(), name='challenge-list'),
    path('actuallity/', ChallengeView.as_view(), name='actuallity'),
    path('profile/<int:id>', UserView.as_view(), name='profile'),
    path('add_challenges/', AddChallengeView.as_view({'post': 'create', 'put': 'update'}), name='add_challenge'),
    #path('update_challenge/', UpdateChallengeView.as_view(), name='update_challenge')
    #path(actuallity/<int:id>)
    #path(my_challenges/)
    #path(best_players/)
]

urlpatterns = format_suffix_patterns(urlpatterns)