import uuid
from django.db import models
from django.conf import settings


class Product(models.Model):
    STATUS_CHOICES = (
        ('published', 'published'),
        ('not_published', 'not_published'),
    )
    id = models.UUIDField(primary_key=True, verbose_name='Product ID', default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=25, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='product_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='product_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "products"

    def __str__(self):
        return self.name


class Variant(models.Model):
    id = models.UUIDField(primary_key=True, verbose_name='Variant ID', default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
    name = models.CharField(max_length=250)
    price = models.CharField(max_length=10)
    sku = models.CharField(max_length=250)
    quantity = models.IntegerField(blank=True)
    available = models.IntegerField(blank=True)
    attribues = models.JSONField(blank=True)
    image = models.ImageField(upload_to='images/')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='variants_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='variants_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "variants"


class Order(models.Model):
    STATUS_CHOICES = (
        ('Paid', 'Paid'),
        ('Cancelled', 'Cancelled'),
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
    )
    id = models.UUIDField(primary_key=True, verbose_name='Variant ID', default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    tracking_no = models.IntegerField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='order_created_by', on_delete=models.SET_NULL, blank=True, null=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='order_updated_by', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "orders"
