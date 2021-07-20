from rest_framework import serializers
from challenge.models import Challenge, UserChallenge
from django.contrib.auth.models import User


class UserChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserChallenge
        fields = ('user', 'challenge', 'status', 'user_id')

        def get_user_count(self, obj):
            return obj.user_id.count()
    

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ("__all__")

class GetUserChallengeSerializer(serializers.ModelSerializer):
    """
    Get challenges informations for GET method 
    """
    title = serializers.CharField(source='challenge.title') 
    category = serializers.CharField(source='challenge.category')
    difficult = serializers.CharField(source='challenge.difficult')
    icon = serializers.CharField(source='challenge.icon')

    class Meta:
        model = UserChallenge
        fields = ("id", "title","difficult", "category", "status", "user_id", "icon", "challenge_id", )

   
      