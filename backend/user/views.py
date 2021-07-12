from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status as rest_status
from rest_framework.decorators import action
from django_filters import rest_framework as filters
from .serializers import RegisterSerializer, UserSerializer, LogoutSerializer, GroupSerializer, ChangePasswordSerializer


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
            group = Group.objects.get(id=request.data['group'])
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


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

