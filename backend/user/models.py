from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    users = models.ManyToManyField(User)

