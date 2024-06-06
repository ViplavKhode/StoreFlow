from django.contrib import admin
from .models import User
from django.contrib.auth.hashers import make_password


class UserAdminConfig(admin.ModelAdmin):
    ordering = ('email',)
    search_fields = ('email', 'first_name',)
    list_display = ('id', 'email', 'first_name', 'last_name')
    
    def save_model(self, request, obj, form, change):
        # Check if the password has been changed or if it's a new user
        if 'password' in form.changed_data or not obj.pk:
            obj.password = make_password(form.cleaned_data['password'])
        obj.save()


admin.site.register(User, UserAdminConfig)
