from django.contrib.auth import models
from rest_framework import generics
from rest_framework.response import Response
from challenge.models import Challenge, Category
from challenge.serializers import ChallengeSerializer, CategorySerializer, UserAskingSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User


class CategoryView(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ChallengeView(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer


class UserAskingView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Challenge.objects.all().filter()
    serializer_class = UserAskingSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        id = self.kwargs['id']
        return Challenge.objects.filter(user__id=id)
    
    



        





        

    


