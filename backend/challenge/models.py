from django.db import models
from django.contrib.auth.models import User


class Challenge(models.Model):
    category = models.CharField(max_length=100)
    difficult = models.IntegerField()
    title = models.CharField(max_length=100)
    icon = models.CharField(max_length=100)

class UserChallenge(models.Model):
    status = models.CharField(max_length=100, null=True)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user", "challenge")


