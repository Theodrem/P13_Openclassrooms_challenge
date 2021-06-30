from challenge.views import UserChallengeView

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users', UserChallengeView)
urlpatterns = router.urls
