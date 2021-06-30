from rest_framework import serializers
from challenge.models import Challenge, UserChallenge
from django.contrib.auth.models import User


class UserChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserChallenge
        fields = ('user', 'challenge', 'status')
    

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ("__all__")

class GetUserChallengeSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='challenge.title') #call serializer
    category = serializers.CharField(source='challenge.category')
    difficult = serializers.CharField(source='challenge.difficult')
    description = serializers.CharField(source='challenge.description')

    class Meta:
        model = UserChallenge
        fields = ("id", "title", "description", "difficult", "category", "status", "user_id")

   
      