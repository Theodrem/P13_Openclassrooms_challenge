# permissions.py
from django.contrib.auth.models import User
from rest_framework import permissions

class HasGroupPermission(permissions.BasePermission):
    """
    Ensure user is in required groups.
    """

    def has_permission(self, request, view):
        if request.method == 'GET':
            try:
                User.objects.get(groups=request.GET['id'], id=request.user.id)
                return True
            except User.DoesNotExist:
                return False
        
        else:
            return True
