from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from products.api.serializers import ProductSerializer
from products.models import Product
class ProductApiViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'active']