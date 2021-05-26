from rest_framework import serializers
from challenge.models import Challenge, Category
from django.contrib.auth.models import User


class ChallengeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Challenge
        fields = ('created', 'difficult', 'title', 'duration', 'status', 'category', 'owner')


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('name', )


class UserSerializer(serializers.ModelSerializer):
    challenge = serializers.HyperlinkedRelatedField(read_only=True, view_name='challenge-detail', many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'challenge')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user