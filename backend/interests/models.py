"""
Interests models for Neural Digital Garden.
"""
from django.db import models
from django.utils.text import slugify


class Interest(models.Model):
    """Interest model for Bento Box section."""
    CATEGORY_CHOICES = [
        ('technology', 'Technology'),
        ('creative', 'Creative'),
        ('lifestyle', 'Lifestyle'),
        ('learning', 'Learning'),
        ('other', 'Other'),
    ]

    SIZE_CHOICES = [
        ('small', 'Small'),
        ('medium', 'Medium'),
        ('large', 'Large'),
        ('wide', 'Wide'),
        ('tall', 'Tall'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, default='medium')
    icon = models.CharField(max_length=50, blank=True, help_text='Icon name or emoji')
    image = models.ImageField(upload_to='interests/images/', blank=True, null=True)
    color = models.CharField(max_length=7, default='#00FFCC', help_text='Hex color code')
    link = models.URLField(blank=True, help_text='External link if applicable')
    order = models.PositiveIntegerField(default=0, help_text='Display order')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['category']),
            models.Index(fields=['order']),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Project(models.Model):
    """Project model for interests section."""
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('on-hold', 'On Hold'),
        ('planned', 'Planned'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=300, help_text='Short description for cards')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planned')
    progress = models.PositiveIntegerField(default=0, help_text='Progress percentage (0-100)')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to='interests/projects/', blank=True, null=True)
    link = models.URLField(blank=True, help_text='Project link or repository')
    github_repo = models.URLField(blank=True, help_text='GitHub repository URL')
    technologies = models.JSONField(default=list, blank=True, help_text='List of technologies used')
    order = models.PositiveIntegerField(default=0, help_text='Display order')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', 'order', '-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['status']),
            models.Index(fields=['-is_featured']),
            models.Index(fields=['order']),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
