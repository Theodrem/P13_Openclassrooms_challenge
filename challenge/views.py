from rest_framework import generics
from challenge.models import Challenge, Category
from challenge.serializers import ChallengeSerializer, CategorySerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser


class ChallengeView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated)
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer


class CategoryView(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


"""class ChallengeUserView(generics.UpdateAPIView):
    permission_classes = (AllowAny, )
    queryset = Challenge.objects.all()
    serializer_class = ChallengeUserSerializer
"""