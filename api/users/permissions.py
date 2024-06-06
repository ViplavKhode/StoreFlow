from rest_framework import permissions


class AdminPermission(permissions.BasePermission):
    """
    Permission class for Admins and Instructors.
    """
    def has_permission(self, request, view):
        # check for authentication
        if request.user.is_authenticated:
            # allow access to superusers, admins and instructors
            if request.user.is_superuser or request.user.role == 'admin':
                return True
        return False