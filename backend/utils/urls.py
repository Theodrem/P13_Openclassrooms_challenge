from .views import NotificationView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'notification', NotificationView)


urlpatterns = router.urls