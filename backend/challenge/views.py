from rest_framework import generics, viewsets
from rest_framework.response import Response
from django.http import HttpResponse
from challenge.models import Challenge, UserChallenge
from challenge.serializers import ChallengeSerializer, GetUserChallengeSerializer, UserChallengeSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework import status as rest_status
from rest_framework import viewsets, permissions
from django.http import HttpResponse
from django.contrib.auth.models import User


class ChallengeView(generics.ListAPIView):
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
        if self.action in ["list", "detail"]:
            return GetUserChallengeSerializer
        return UserChallengeSerializer
    
    def filter_queryset(self, queryset):
        return queryset.filter(user=self.request.user)
    
    #def as_object_permissions(self, )



        

       
        
 
                
       


    














    

    


    

        





        

    


