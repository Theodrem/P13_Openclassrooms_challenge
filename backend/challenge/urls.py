from challenge.views import UserChallengeView, ChallengeView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users-challenges', UserChallengeView)
router.register(r'challenges', ChallengeView)

urlpatterns = router.urls
