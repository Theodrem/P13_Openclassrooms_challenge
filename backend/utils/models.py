from django.db import models
from django.contrib.auth.models import User, Group
from django.utils import timezone


class Notifications(models.Model):
    ricipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ricipient")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    description = models.TextField()

    class Meta:
        unique_together = ("ricipient", "group")