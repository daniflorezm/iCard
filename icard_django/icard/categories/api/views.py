from rest_framework.viewsets import ModelViewSet
from categories.models import Category
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from categories.api.serializers import CategorySerializer

class CategoryApiView(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()