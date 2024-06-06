from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password


class UserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, password=make_password(password), **extra_fields)
        user.is_active = True
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The given email must be set")
        if not extra_fields.get("first_name"):
            raise ValueError("First Name is needed")
        if not extra_fields.get("last_name"):
            raise ValueError("Last name is needed")
        user = self.model(
            email=email,
            password=make_password(password),
            first_name=extra_fields.get("first_name"),
            last_name=extra_fields.get("last_name"),
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user