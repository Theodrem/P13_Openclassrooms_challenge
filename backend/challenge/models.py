from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)


class Challenge(models.Model):
    category = models.ForeignKey(Category, related_name='challenge', on_delete=models.CASCADE)
    difficult = models.IntegerField()
    description = models.TimeField()
    title = models.CharField(max_length=100)

    class Meta:
        ordering = ['difficult']


class UserChallenge(models.Model):
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=100)

    class Meta:
        ordering = ['status']