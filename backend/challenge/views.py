from rest_framework import generics, viewsets, status 
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from challenge.models import Challenge, UserChallenge
from challenge.serializers import ChallengeSerializer, AddChallengeSerializer, UserChallengeSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from rest_framework import status as rest_status
from rest_framework import viewsets
from django.http import HttpResponse
from django.contrib.auth.models import User



class UserView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = UserChallenge.objects.all().filter()
    serializer_class = UserChallengeSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        queryset = UserChallenge.objects.filter(user_id=self.kwargs['id'])
        return queryset


class ChallengeView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer

        
class AddChallengeView(viewsets.ModelViewSet): #une vue par model
    #viewset 
    permission_classes = (IsAuthenticated, )
    serializer_class = AddChallengeSerializer

    def create(self, request, *args, **kwargs):
        data = request.data 
        challenge = Challenge.objects.get(id=data["challenge"])
        try:
             new_challenge = UserChallenge.objects.get(user=request.user, challenge=challenge)
             return Response(status=rest_status.HTTP_404_NOT_FOUND)
        except UserChallenge.DoesNotExist: 
            new_challenge = UserChallenge.objects.create(user=request.user, challenge=challenge, status=data["status"])
            new_challenge.save()
        serializer = UserChallengeSerializer(new_challenge)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        data = request.data
        try:
            user_challenge = UserChallenge.objects.get(user=request.user, challenge=data["challenge"])
            user_challenge.status = data["status"]
            user_challenge.save()
        
            serializer = UserChallengeSerializer(user_challenge)
            return Response(serializer.data)
        except UserChallenge.DoesNotExist:
            return Response(status=rest_status.HTTP_404_NOT_FOUND)

    

        

       
        
 
                
       


    














    

    


    

        





        

    


