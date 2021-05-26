from rest_framework import permissions
from rest_framework import viewsets


from challenge.models import Challenge, Category
from challenge.serializers import ChallengeSerializer, CategorySerializer
from challenge.permissions import IsOwnerOrReadOnly


class ChallengeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


