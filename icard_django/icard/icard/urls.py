"""
URL configuration for icard project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import re_path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from users.api.router import router_user, urlpatterns
from categories.api.router import router_categories
from products.api.router import router_products
from tables.api.router import router_table
from orders.api.router import router_orders
from payments.api.router import router_payments

schema_view = get_schema_view(
   openapi.Info(
      title="iCard Docs",
      default_version='v1',
      description="Documentation for iCard",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="daniel.florez@basf.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/', include(router_user.urls)),
    path('api/', include(urlpatterns)),
    path('api/', include(router_categories.urls)),
    path('api/', include(router_products.urls)),
    path('api/', include(router_table.urls)),
    path('api/', include(router_orders.urls)),
    path('api/', include(router_payments.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
