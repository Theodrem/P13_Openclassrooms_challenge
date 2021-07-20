from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_simplejwt.serializers import RefreshToken
from rest_framework_simplejwt.views import TokenError
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from user.models import Post


class GroupSerializer(serializers.ModelSerializer):
    """
    Group serializer
    """
    class Meta:
        model = Group
        fields = ('name', 'id')


class UserSerializer(serializers.ModelSerializer):
    """
    User serializer for method Get
    """
    groups = GroupSerializer(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff', 'groups', 'first_name', 'last_name')

class RegisterSerializer(serializers.ModelSerializer):
    """
    Register serializer with methode create and validate for check if the passowrds matches
    """
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "The passwords doesn't matches"})

        return attrs

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


class LogoutSerializer(serializers.Serializer):
    """
    Logout serializer. Blacklist the access token
    """
    refresh = serializers.CharField()
    default_error_messages = {"bad_token": ("Token is invalid or expired")}

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail("bad_token")



class PostSerializer(serializers.ModelSerializer):
    """
    Post serializer for Post method
    """
    class Meta:
        model = Post
        fields = ('__all__')

class GetPostSerializer(serializers.ModelSerializer):
    """
    Post serializer for get method
    """
    username = serializers.CharField(source='author.username') 
    id_user = serializers.CharField(source='author.id')
    class Meta:
        model = Post
        fields = ('text', 'username', 'id_user', 'id')        


