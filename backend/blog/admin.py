"""
Blog admin configuration for Neural Digital Garden.
"""
from django.contrib import admin
from .models import Category, Tag, Post, Comment


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin configuration for Category model."""
    list_display = ['name', 'slug', 'post_count', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at']

    def post_count(self, obj):
        return obj.posts.filter(status='published').count()
    post_count.short_description = 'Published Posts'


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    """Admin configuration for Tag model."""
    list_display = ['name', 'slug', 'post_count', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at']

    def post_count(self, obj):
        return obj.posts.filter(status='published').count()
    post_count.short_description = 'Published Posts'


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    """Admin configuration for Post model."""
    list_display = ['title', 'author', 'category', 'status', 'is_featured', 'view_count', 'reading_time', 'published_at']
    list_filter = ['status', 'is_featured', 'category', 'tags', 'created_at', 'published_at']
    search_fields = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    readonly_fields = ['view_count', 'created_at', 'updated_at', 'published_at']
    date_hierarchy = 'published_at'
    ordering = ['-published_at', '-created_at']

    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'featured_image')
        }),
        ('Categorization', {
            'fields': ('category', 'tags')
        }),
        ('Publication', {
            'fields': ('status', 'is_featured', 'published_at')
        }),
        ('Metadata', {
            'fields': ('reading_time', 'view_count', 'created_at', 'updated_at')
        }),
    )

    def save_model(self, request, obj, form, change):
        if not change:  # If creating a new post
            obj.author = request.user
        super().save_model(request, obj, form, change)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    """Admin configuration for Comment model."""
    list_display = ['author_name', 'post', 'is_approved', 'parent', 'created_at']
    list_filter = ['is_approved', 'created_at']
    search_fields = ['author_name', 'author_email', 'content']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

    actions = ['approve_comments', 'unapprove_comments']

    def approve_comments(self, request, queryset):
        """Approve selected comments."""
        updated = queryset.update(is_approved=True)
        self.message_user(request, f'{updated} comment(s) approved.')
    approve_comments.short_description = 'Approve selected comments'

    def unapprove_comments(self, request, queryset):
        """Unapprove selected comments."""
        updated = queryset.update(is_approved=False)
        self.message_user(request, f'{updated} comment(s) unapproved.')
    unapprove_comments.short_description = 'Unapprove selected comments'
