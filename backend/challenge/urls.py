from challenge.views import UserChallengeView, ChallengeView
from django.conf.urls import url
from django.urls import path
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users-challenges', UserChallengeView)
router.register(r'challenges', ChallengeView)

urlpatterns = router.urls
