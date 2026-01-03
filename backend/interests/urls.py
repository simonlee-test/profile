"""
Interests URL configuration for Neural Digital Garden.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from .views import InterestViewSet, ProjectViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'interests', InterestViewSet, basename='interest')
router.register(r'projects', ProjectViewSet, basename='project')

app_name = 'interests'

urlpatterns = [
    path('', include(router.urls)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
