from rest_framework.routers import DefaultRouter
from tables.api.views import TableViewSet

router_table = DefaultRouter()

router_table.register(prefix = 'tables', basename = 'tables', viewset = TableViewSet)