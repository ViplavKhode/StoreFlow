from django.urls import path, include
from . import views

urlpatterns = [
    path('create-user/', views.CreateUserView.as_view(), name='create_user'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('customers/list/', views.CustomerListView.as_view(), name='customer_list'),
]
