import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from .managers import UserManager


class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'admin'),
        ('inventory_manager', 'inventory_manager'),
        ('warehouse_supervisor', 'warehouse_supervisor'),
        ('customer', 'customer'),
    )
    STATUS_CHOICES = (
        ('active', 'active'),
        ('inactive', 'inactive'),
    )

    id = models.UUIDField(primary_key=True, verbose_name='User ID', default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = None
    role = models.CharField(choices=ROLE_CHOICES, max_length=50, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=25, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    ordering = ('email',)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    class Meta:
        db_table = "user"

    def __str__(self):
        return self.first_name

