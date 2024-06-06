from django.urls import path, include
from . import views

urlpatterns = [
    path('create-product/', views.ProductView.as_view(), name='create_product'),
    path('list/', views.ProductView.as_view(), name='products_list'),
    path('inventory/list/', views.InventoryListView.as_view(), name='inventory_list'),
    path('orders/list/', views.OrderListView.as_view(), name='orders_list'),
]
