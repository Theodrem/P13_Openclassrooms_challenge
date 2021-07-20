from rest_framework import viewsets, generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from .serializers import NotificationSerializer, GetNotificationSerializer
from .models import Notifications

class NotificationsFilter(filters.FilterSet):
    """
    Notifications filiter by ricipient 
    """
    ricipient = filters.CharFilter(field_name="ricipient")

    class Meta:
        model = Notifications
        fields = ['ricipient']

class NotificationView(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = NotificationsFilter
    permission_classes = (IsAuthenticated,)
    queryset = Notifications.objects.all()

    def get_serializer_class(self):
        """
        Select GetNotificationSerializer if method GET 
        """
        if self.action in ["list", "detail"]:
            return GetNotificationSerializer
        return NotificationSerializer
