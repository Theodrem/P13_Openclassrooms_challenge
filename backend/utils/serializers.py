from rest_framework import serializers
from .models import Notifications


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = ('__all__')

class GetNotificationSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name')
    sender_name = serializers.CharField(source='sender.username')
    class Meta:
        model = Notifications
        fields = ('group_name', 'description', 'ricipient', 'group', 'id', 'sender_name')
