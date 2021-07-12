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
from django_filters import rest_framework as filters
from django.http import HttpResponse
from django.contrib.auth.models import Group, User
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
    
class UserChallengeFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr='icontains')
    id = filters.NumberFilter(field_name="user_id")
    status = filters.CharFilter(field_name="status")

    class Meta:
        model = UserChallenge
        fields = ['name',  'user_id']

class UserChallengeView(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserChallengeFilter
    permission_classes = (IsAuthenticated, UserChallengePermission)
    queryset = UserChallenge.objects.all()

    def get_serializer_class(self):
        if self.action in ["list", "detail", "user", "best_player"]:
            return GetUserChallengeSerializer
        return UserChallengeSerializer

    

   
    


        


 


        

       
        
 
                
       


    














    

    


    

        





        

    


