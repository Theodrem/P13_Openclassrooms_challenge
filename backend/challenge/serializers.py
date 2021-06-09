from rest_framework import serializers

from challenge.models import Challenge, Category


class ChallengeSerializer(serializers.ModelSerializer):
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
        return challenge


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', )

"""
class ChallengeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ('id', 'created', 'owner')

    def update(self, challenge, validated_data):
        challenge = Challenge.objects.get(id=id)
        challenge(owner=)
        challenge.save()
        return challenge

"""