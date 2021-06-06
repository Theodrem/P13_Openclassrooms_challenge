from rest_framework import generics
from rest_framework.response import Response
from challenge.models import Challenge, Category
from challenge.serializers import ChallengeSerializer, CategorySerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser


class ChallengeView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer

class GetChallengeView(generics.RetrieveAPIView):
    queryset = Challenge.objects.all()
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = ChallengeSerializer(queryset, many=True)
        return Response(serializer.data)

class CategoryView(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


"""class ChallengeUserView(generics.UpdateAPIView):
    permission_classes = (AllowAny, )
    queryset = Challenge.objects.all()
    serializer_class = ChallengeUserSerializer
"""