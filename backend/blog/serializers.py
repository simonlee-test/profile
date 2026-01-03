"""
Blog serializers for Neural Digital Garden.
"""
from rest_framework import serializers
from .models import Category, Tag, Post, Comment


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model."""
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'post_count', 'created_at']
        read_only_fields = ['slug', 'created_at']

    def get_post_count(self, obj):
        return obj.posts.filter(status='published').count()


class TagSerializer(serializers.ModelSerializer):
    """Serializer for Tag model."""
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'post_count', 'created_at']
        read_only_fields = ['slug', 'created_at']

    def get_post_count(self, obj):
        return obj.posts.filter(status='published').count()


class CommentSerializer(serializers.ModelSerializer):
    """Serializer for Comment model."""
    replies = serializers.SerializerMethodField()
    author_name_display = serializers.CharField(source='author_name', read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id', 'post', 'author_name', 'author_name_display', 'author_email',
            'content', 'parent', 'is_approved', 'replies', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_replies(self, obj):
        replies = obj.replies.filter(is_approved=True)
        return CommentSerializer(replies, many=True).data


class PostListSerializer(serializers.ModelSerializer):
    """Serializer for Post list view."""
    author_name = serializers.CharField(source='author.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'author_name', 'category_name', 'tags',
            'excerpt', 'featured_image', 'status', 'is_featured', 'reading_time',
            'view_count', 'comment_count', 'created_at', 'updated_at', 'published_at'
        ]

    def get_comment_count(self, obj):
        return obj.comments.filter(is_approved=True).count()


class PostDetailSerializer(serializers.ModelSerializer):
    """Serializer for Post detail view."""
    author_name = serializers.CharField(source='author.username', read_only=True)
    author_email = serializers.EmailField(source='author.email', read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'author_name', 'author_email', 'category',
            'tags', 'excerpt', 'content', 'featured_image', 'status', 'is_featured',
            'reading_time', 'view_count', 'comment_count', 'comments',
            'created_at', 'updated_at', 'published_at'
        ]
        read_only_fields = ['slug', 'view_count', 'created_at', 'updated_at', 'published_at']

    def get_comment_count(self, obj):
        return obj.comments.filter(is_approved=True).count()


class PostCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating posts."""
    tags = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Post
        fields = [
            'title', 'slug', 'category', 'tags', 'excerpt', 'content',
            'featured_image', 'status', 'is_featured', 'reading_time'
        ]

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        post = Post.objects.create(**validated_data)
        
        # Create or get tags and add to post
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(
                name=tag_name,
                defaults={'slug': tag_name.lower().replace(' ', '-')}
            )
            post.tags.add(tag)
        
        return post

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)
        
        # Update post fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update tags if provided
        if tags_data is not None:
            instance.tags.clear()
            for tag_name in tags_data:
                tag, created = Tag.objects.get_or_create(
                    name=tag_name,
                    defaults={'slug': tag_name.lower().replace(' ', '-')}
                )
                instance.tags.add(tag)
        
        return instance
