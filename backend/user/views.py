from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status as rest_status
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from .serializers import RegisterSerializer, UserSerializer, LogoutSerializer, GroupSerializer


class UserFilter(filters.FilterSet):
    username = filters.CharFilter(field_name="username", lookup_expr='icontains')
    groups = filters.NumberFilter(field_name="groups")
    id = filters.NumberFilter(field_name="id")

    class Meta:
        model = User
        fields = ['username', 'groups', 'id']


class GroupFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr='icontains')
    id = filters.NumberFilter(field_name="id")

    class Meta:
        model = Group
        fields = ['name',  'id']


class UserView(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserFilter
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(methods=['post'], detail=False)
    def add_user_group(self, request):
        try:
            user = User.objects.get(id=request.data['user'])
            group =Group.objects.get(name=request.data['name'])
            user.groups.add(group)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except(User.DoesNotExist, Group.DoesNotExist):
            return Response(status=rest_status.HTTP_404_NOT_FOUND)
        
   
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class LogoutView(generics.GenericAPIView):
    """
    API endpoint view that blacklists refresh token
    """

    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GroupView(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = GroupFilter
    permission_classes = (IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer



    

