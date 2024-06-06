from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Variant, Order
import uuid

class ProductView(APIView):
    def get(self, request):
        products_list = {
            "products": []
        }

        products = Product.objects.all()
        for product in products:
            variants = Variant.objects.filter(product=product.id)
            stock = sum(variant.available for variant in variants)
            products_list["products"].append({
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "category": product.category,
                "inventory": f"{stock} in stock for {len(variants)} variants",
                "status": product.status
            })

        return Response(products_list, status=status.HTTP_200_OK)
    
    def generate_sku(self, product_name, category):
        unique_id = str(uuid.uuid4().hex)[:6]
        name = product_name.replace(" ", "").lower()
        category = category.replace(" ", "").lower()
        sku = category[:3] + name[:3] + unique_id

        return sku

    def post(self, request):
        data = request.data
        print("data: ", data)
        product = Product(
            name=data["title"],
            description=data["description"],
            category=data["category"],
            status="published",
        )
        product.save()

        for each_variant in data["variants"]:
            sku = self.generate_sku(data["title"], data["category"])
            variant = Variant(
                product=product,
                name=each_variant["name"],
                price=each_variant["price"],
                sku=sku,
                quantity=each_variant["quantity"],
                available=each_variant["quantity"],
                attribues=each_variant["variantAttributes"],
                image=each_variant["image"]
            )
            variant.save()

        return Response(status=status.HTTP_201_CREATED)
    

class InventoryListView(APIView):
    def get(self, request):
        products = Product.objects.filter(status="published")

        inventory = {
            "products": []
        }

        for product in products:
            variants = Variant.objects.filter(product=product.id)
            for variant in variants:
                print(variant.attribues)
                variant_name = ' '.join([value.capitalize() for item in variant.attribues for value in item.values()])
                inventory["products"].append({
                    "id": product.id,
                    "name": product.name,
                    "description": product.description,
                    "category": product.category,
                    "sku": variant.sku,
                    "variant_name": variant_name,
                    "available": variant.quantity,
                })

        return Response(inventory, status=status.HTTP_200_OK)



class OrderListView(APIView):
    def get(self, request):
        orders = Order.objects.all()

        order_list = {
            "orders": []
        }

        for order in orders:
            order_list["orders"].append({
                "id": order.id,
                "trackingNo": order.tracking_no,
                "status": order.status,
                "customer": f"{order.customer.first_name} {order.customer.last_name}",
                "date": order.created_at.date()
            })

        return Response(order_list, status=status.HTTP_200_OK)


    