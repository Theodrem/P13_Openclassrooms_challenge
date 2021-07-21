from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from challenge.models import Challenge, UserChallenge
from challenge.serializers import ChallengeSerializer, GetUserChallengeSerializer, UserChallengeSerializer



class ChallengeView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer


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
    permission_classes = (IsAuthenticated, )
    queryset = UserChallenge.objects.all()

    def get_serializer_class(self):
        """
        GetUserChallengeSerializer is used if method Get 
        """
        if self.action in ["list", "detail", "user"]:
            return GetUserChallengeSerializer
        return UserChallengeSerializer

    

   
    


        


 


        

       
        
 
                
       


    














    

    


    

        





        

    


