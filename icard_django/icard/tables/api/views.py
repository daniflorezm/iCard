from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from tables.api.serializers import TableSerializer
from django_filters.rest_framework import DjangoFilterBackend

from tables.models import Table

class TableViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = TableSerializer
    queryset = Table.objects.all().order_by('number')
    filter_backends = [DjangoFilterBackend]
    filterset_fields=['number']