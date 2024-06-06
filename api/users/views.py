from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist
from .models import User
from .serializers import CreateUserSerializer
from .permissions import AdminPermission
import random
from datetime import datetime, timedelta


class CreateUserView(APIView):
    authentication_classes = [TokenAuthentication] 
    permission_classes = [AdminPermission] 
    
    def post(self, request):
        data = request.data
        serializer = CreateUserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def authenticate(data):
        try:
            user = User.objects.get(email=data["email"])
        except ObjectDoesNotExist:
            return None
        
        if check_password(data['password'], user.password):
            return user


    def post(self, request):
        data = request.data
        user = self.authenticate(data)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'user':{
                    "email": user.email,
                    "name": f"{user.first_name} {user.last_name}",
                    "role": user.role,
                },
                'token': token.key
                }, status=status.HTTP_200_OK)
        return Response(status=400)
    

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated]  

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
    

class CustomerListView(APIView):
    # authentication_classes = [TokenAuthentication] 
    # permission_classes = [AdminPermission]

    @staticmethod
    def generate_random_total_orders():
        return random.randint(100, 1000)

    @staticmethod
    def generate_random_last_order_date():
        today = datetime.now()
        one_year_ago = today - timedelta(days=365)
        return one_year_ago + timedelta(days=random.randint(0, 365))

    @staticmethod
    def generate_random_usa_mobile_number():
        area_code = random.randint(100, 999)
        next_seven_digits = random.randint(1000000, 9999999)
        phone_number = f"({area_code}) {next_seven_digits // 10000}-{next_seven_digits % 10000:04d}"
        return phone_number
   

    def get(self, request):
        customers = User.objects.filter(role="customer")

        customers_list = {
            "customers": []
        }

        for customer in customers:
            customers_list["customers"].append({
                "id": customer.id,
                "name": f"{customer.first_name} {customer.last_name}",
                "phone": self.generate_random_usa_mobile_number(),
                "email": customer.email,
                "joindate": customer.created_at.date(),
                "ordersum": self.generate_random_total_orders(),
                "lastorderdate": self.generate_random_last_order_date().date()
            })

        return Response(customers_list, status=status.HTTP_200_OK)