from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)


class Challenge(models.Model):
    category = models.ForeignKey(Category, related_name='challenge', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    difficult = models.IntegerField()
    title = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    duration = models.IntegerField(null=True)
    owner = models.ManyToManyField('auth.User', related_name='challenge')

    class Meta:
        ordering = ['created']


