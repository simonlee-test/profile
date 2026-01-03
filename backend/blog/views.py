"""
Blog API views for Neural Digital Garden.
"""
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from .models import Category, Tag, Post, Comment
from .serializers import (
    CategorySerializer,
    TagSerializer,
    PostListSerializer,
    PostDetailSerializer,
    PostCreateUpdateSerializer,
    CommentSerializer
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Category model."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Tag model."""
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class PostViewSet(viewsets.ModelViewSet):
    """ViewSet for Post model."""
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'category', 'tags', 'is_featured']
    search_fields = ['title', 'excerpt', 'content']
    ordering_fields = ['created_at', 'updated_at', 'published_at', 'view_count']
    ordering = ['-published_at', '-created_at']

    def get_queryset(self):
        """Get filtered queryset based on user permissions."""
        queryset = Post.objects.select_related('author', 'category').prefetch_related('tags')
        
        # Non-authenticated users only see published posts
        if not self.request.user.is_authenticated:
            queryset = queryset.filter(status='published')
        # Non-staff users only see their own drafts and all published posts
        elif not self.request.user.is_staff:
            queryset = queryset.filter(
                Q(status='published') | Q(author=self.request.user)
            )
        
        return queryset

    def get_serializer_class(self):
        """Get appropriate serializer based on action."""
        if self.action == 'list':
            return PostListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PostCreateUpdateSerializer
        return PostDetailSerializer

    def perform_create(self, serializer):
        """Set author when creating a post."""
        serializer.save(author=self.request.user)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured posts."""
        featured_posts = self.get_queryset().filter(is_featured=True, status='published')[:5]
        serializer = PostListSerializer(featured_posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def popular(self, request):
        """Get popular posts by view count."""
        popular_posts = self.get_queryset().filter(status='published').order_by('-view_count')[:10]
        serializer = PostListSerializer(popular_posts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def increment_view(self, request, slug=None):
        """Increment view count for a post."""
        post = self.get_object()
        post.increment_view_count()
        return Response({'view_count': post.view_count})

    @action(detail=True, methods=['get', 'post'])
    def comments(self, request, slug=None):
        """Get or create comments for a post."""
        post = self.get_object()
        
        if request.method == 'GET':
            comments = post.comments.filter(is_approved=True, parent=None)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(post=post, is_approved=False)  # Comments need approval
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(viewsets.ModelViewSet):
    """ViewSet for Comment model."""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['post', 'parent', 'is_approved']

    def get_queryset(self):
        """Get filtered queryset based on user permissions."""
        queryset = Comment.objects.select_related('post', 'parent')
        
        # Non-authenticated users only see approved comments
        if not self.request.user.is_authenticated:
            queryset = queryset.filter(is_approved=True)
        # Non-staff users only see their own unapproved comments
        elif not self.request.user.is_staff:
            queryset = queryset.filter(
                Q(is_approved=True) | Q(author_email=self.request.user.email)
            )
        
        return queryset

    def perform_create(self, serializer):
        """Set post when creating a comment."""
        post_id = self.request.data.get('post')
        if post_id:
            post = Post.objects.get(id=post_id)
            serializer.save(post=post)
        else:
            serializer.save()
