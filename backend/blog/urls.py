"""
Blog URL configuration for Neural Digital Garden.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from .views import CategoryViewSet, TagViewSet, PostViewSet, CommentViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'posts', PostViewSet, basename='post')
router.register(r'comments', CommentViewSet, basename='comment')

app_name = 'blog'

urlpatterns = [
    path('', include(router.urls)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
