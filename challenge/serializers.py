from rest_framework import serializers
from challenge.models import Challenge, Category


class ChallengeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Challenge
        fields = ('created', 'difficult', 'title', 'duration', 'status', 'category', 'owner')


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('name', )


