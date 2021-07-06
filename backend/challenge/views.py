from django.db.models import query
from rest_framework import generics, viewsets
from rest_framework.response import Response
from django.http import HttpResponse
from challenge.models import Challenge, UserChallenge
from challenge.serializers import ChallengeSerializer, GetUserChallengeSerializer, UserChallengeSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework import status 
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.db.models import Count


class ChallengeView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer


class UserChallengePermission(permissions.BasePermission):

    def has_object_permission(self, request, view, user_challenge):
        if request.method in permissions.SAFE_METHODS:
            return True

        return user_challenge.user == request.user
    
        
class UserChallengeView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, UserChallengePermission)
    queryset = UserChallenge.objects.all()

    def get_serializer_class(self):
        if self.action in ["list", "detail", "user", "best_player"]:
            return GetUserChallengeSerializer
        return UserChallengeSerializer
    
    @action(methods=['get'], detail=False, url_path=r'user/(?P<id>\d+)')
    def user(self, request, id):
        queryset = UserChallenge.objects.all().filter(user=id)
        serializer = GetUserChallengeSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def best_player(self, request):
        queryset = UserChallenge.objects.filter(status="validé").order_by("challenge_id")
        serializer = GetUserChallengeSerializer(queryset, many=True)
        return Response(serializer.data)
        

    #def filter_queryset
    
        
    



        

       
        
 
                
       


    














    

    


    

        





        

    


