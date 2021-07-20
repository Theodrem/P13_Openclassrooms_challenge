from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status as rest_status
from rest_framework.decorators import action
from django_filters import rest_framework as filters
from .serializers import RegisterSerializer, UserSerializer, LogoutSerializer, GroupSerializer, PostSerializer, GetPostSerializer
from .models import Post
from .permissions import HasGroupPermission


class UserFilter(filters.FilterSet):
    """
    Filter for the model User
    """
    username = filters.CharFilter(field_name="username", lookup_expr='icontains')
    groups = filters.NumberFilter(field_name="groups")
    id = filters.NumberFilter(field_name="id")

    class Meta:
        model = User
        fields = ['username', 'groups', 'id']


class GroupFilter(filters.FilterSet):
    """
    Filter for the model Group
    """
    name = filters.CharFilter(field_name="name", lookup_expr='icontains')
    id = filters.NumberFilter(field_name="id")

    class Meta:
        model = Group
        fields = ['name',  'id']

class PostFilter(filters.FilterSet):
    """
    Filter for the model Post
    """
    group = filters.NumberFilter(field_name="group")
    id = filters.NumberFilter(field_name="id")

    class Meta:
        model = Post
        fields = ['group',  'id']


class UserView(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserFilter
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(methods=['post'], detail=False)
    def add_user_group(self, request):
        """
        add user in group if user and group input exist
        """
        try:
            user = User.objects.get(id=request.data['user'])
            group = Group.objects.get(id=request.data['group'])
            user.groups.add(group)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except(User.DoesNotExist, Group.DoesNotExist):
            return Response(status=rest_status.HTTP_404_NOT_FOUND)
    
    @action(methods=['delete'], detail=False)
    def delete_user_group(self, request):
        """
        delete user in group if user and group input exist
        """
        try:
            user = User.objects.get(id=request.data['user'])
            group = Group.objects.get(id=request.data['group'])
            user.groups.remove(group)
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
    permission_classes = (IsAuthenticated, HasGroupPermission)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    

class PostView(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PostFilter
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()

    def get_serializer_class(self):
        """
        GetPostSerializer is used if method Get 
        """
        if self.action in ["list", "detail"]:
            return GetPostSerializer
        return PostSerializer
        
