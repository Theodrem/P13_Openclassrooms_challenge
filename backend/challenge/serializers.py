from rest_framework import serializers
from challenge.models import Challenge, UserChallenge
from django.contrib.auth.models import User


class AddChallengeSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    status = serializers.HiddenField(default="En cours")
    class Meta:
        model = UserChallenge
        fields = ('user', 'challenge', 'status')
    
    def create(self, validated_data):
        try:
            challenge = UserChallenge.objects.get(**validated_data)
            return challenge
        except UserChallenge.DoesNotExist:
            challenge = UserChallenge.objects.create(**validated_data)
            challenge.save()
            return challenge


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ("id", "title", "description", "difficult", "category")

        