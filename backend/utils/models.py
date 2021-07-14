from django.db import models
from django.contrib.auth.models import User, Group
from django.utils import timezone


class Notifications(models.Model):
    #notif_senders (related_name)
    ricipient = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    description = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)