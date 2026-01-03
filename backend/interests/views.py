"""
Interests API views for Neural Digital Garden.
"""
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Interest, Project
from .serializers import (
    InterestSerializer,
    InterestListSerializer,
    ProjectSerializer,
    ProjectListSerializer,
    ProjectDetailSerializer
)


class InterestViewSet(viewsets.ModelViewSet):
    """ViewSet for Interest model."""
    permission_classes = []  # Allow public access
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'size', 'is_active']
    search_fields = ['title', 'description']
    ordering_fields = ['order', 'title', 'created_at']
    ordering = ['order', 'title']

    def get_queryset(self):
        """Get filtered queryset."""
        return Interest.objects.filter(is_active=True)

    def get_serializer_class(self):
        """Get appropriate serializer based on action."""
        if self.action == 'list':
            return InterestListSerializer
        return InterestSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    """ViewSet for Project model."""
    permission_classes = []  # Allow public access
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'is_featured']
    search_fields = ['title', 'description', 'short_description']
    ordering_fields = ['order', 'title', 'created_at', 'progress']
    ordering = ['-is_featured', 'order', '-created_at']

    def get_serializer_class(self):
        """Get appropriate serializer based on action."""
        if self.action == 'list':
            return ProjectListSerializer
        elif self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectSerializer
