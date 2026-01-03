"""
Interests serializers for Neural Digital Garden.
"""
from rest_framework import serializers
from .models import Interest, Project


class InterestSerializer(serializers.ModelSerializer):
    """Serializer for Interest model."""

    class Meta:
        model = Interest
        fields = [
            'id', 'title', 'slug', 'description', 'category', 'size',
            'icon', 'image', 'color', 'link', 'order', 'is_active',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']


class InterestListSerializer(serializers.ModelSerializer):
    """Serializer for Interest list view (lightweight)."""

    class Meta:
        model = Interest
        fields = [
            'id', 'title', 'slug', 'description', 'category', 'size',
            'icon', 'image', 'color', 'link', 'order', 'is_active'
        ]


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model."""

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'status', 'progress', 'start_date', 'end_date', 'image',
            'link', 'github_repo', 'technologies', 'order', 'is_featured',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']


class ProjectListSerializer(serializers.ModelSerializer):
    """Serializer for Project list view (lightweight)."""

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_description', 'status',
            'progress', 'image', 'link', 'github_repo', 'technologies',
            'order', 'is_featured'
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer for Project detail view."""

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'status', 'progress', 'start_date', 'end_date', 'image',
            'link', 'github_repo', 'technologies', 'order', 'is_featured',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']
