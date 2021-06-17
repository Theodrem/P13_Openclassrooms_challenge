from rest_framework import serializers
from challenge.models import Challenge, Category
from django.contrib.auth.models import User


class ChallengeSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name')
    class Meta:
        model = Challenge
        fields = '__all__'

    def create(self, validated_data):
        challenge = Challenge.objects.create(
            difficult=validated_data['difficult'],
            title=validated_data['title'],
            category=validated_data['category'],
        )
        challenge.save()
        return Challenge

class UserAskingSerializer(serializers.ModelSerializer):
    Challenge_name = serializers.CharField(source='challenge.name')
    username = serializers.CharField(source='user.username')
    class Meta:
        model = Challenge
        fields = ( 'id', 'challenge_name', 'username')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', )

