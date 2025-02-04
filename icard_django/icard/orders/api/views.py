from rest_framework.viewsets import ModelViewSet
from orders.models import Order
from orders.api.serializers import OrderSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
class OrderApiViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['table', 'status', 'payment', 'close']
    ordering_fields = '__all__'
    