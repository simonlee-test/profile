"""
Interests admin configuration for Neural Digital Garden.
"""
from django.contrib import admin
from .models import Interest, Project


@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    """Admin configuration for Interest model."""
    list_display = ['title', 'category', 'size', 'is_active', 'order', 'created_at']
    list_filter = ['category', 'size', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['order', 'title']

    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'description', 'icon', 'image')
        }),
        ('Categorization', {
            'fields': ('category', 'size', 'color')
        }),
        ('Link', {
            'fields': ('link',)
        }),
        ('Display', {
            'fields': ('order', 'is_active')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin configuration for Project model."""
    list_display = ['title', 'status', 'progress', 'is_featured', 'order', 'created_at']
    list_filter = ['status', 'is_featured', 'created_at']
    search_fields = ['title', 'description', 'short_description']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-is_featured', 'order', '-created_at']

    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'description', 'short_description', 'image')
        }),
        ('Status', {
            'fields': ('status', 'progress', 'is_featured')
        }),
        ('Dates', {
            'fields': ('start_date', 'end_date')
        }),
        ('Links', {
            'fields': ('link', 'github_repo')
        }),
        ('Technologies', {
            'fields': ('technologies',)
        }),
        ('Display', {
            'fields': ('order',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at')
        }),
    )
