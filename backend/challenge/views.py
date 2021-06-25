from rest_framework import generics, viewsets
from rest_framework.response import Response
from django.http import HttpResponse
from challenge.models import Challenge, UserChallenge
from challenge.serializers import ChallengeSerializer, AddChallengeSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from django.contrib.auth.models import User

class UsrChallengeView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Challenge.objects.all().filter()
    serializer_class = ChallengeSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        id = self.kwargs['id']
        return Challenge.objects.filter(user__id=id)
    

class ChallengeView(generics.ListAPIView):
    permission_classes = (AllowAny, )
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer

        
class AddChallengeView(generics.CreateAPIView):
    permission_classes = (AllowAny, )
    queryset = UserChallenge.objects.all()
    serializer_class = AddChallengeSerializer

   














    

    


    

        





        

    


