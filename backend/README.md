# Neural Digital Garden - Django Backend

Backend API for the Neural Digital Garden portfolio website.

## Setup

### Prerequisites

- Python 3.12+
- pip
- Virtual environment (recommended)

### Installation

1. Create a virtual environment:

```bash
python -m venv venv
```

2. Activate the virtual environment:

- Windows:

```bash
venv\Scripts\activate
```

- macOS/Linux:

```bash
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Copy environment variables:

```bash
copy .env.example .env
```

5. Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create a superuser:

```bash
python manage.py createsuperuser
```

7. Run the development server:

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Blog API

- `GET /api/blog/categories/` - List all categories
- `GET /api/blog/categories/{id}/` - Get category details
- `GET /api/blog/tags/` - List all tags
- `GET /api/blog/tags/{id}/` - Get tag details
- `GET /api/blog/posts/` - List all posts
- `GET /api/blog/posts/{slug}/` - Get post details
- `POST /api/blog/posts/` - Create a new post (authenticated)
- `PUT /api/blog/posts/{slug}/` - Update a post (authenticated)
- `DELETE /api/blog/posts/{slug}/` - Delete a post (authenticated)
- `GET /api/blog/posts/featured/` - Get featured posts
- `GET /api/blog/posts/popular/` - Get popular posts
- `POST /api/blog/posts/{slug}/increment_view/` - Increment post view count
- `GET /api/blog/posts/{slug}/comments/` - Get post comments
- `POST /api/blog/comments/` - Create a comment
- `PUT /api/blog/comments/{id}/` - Update a comment (authenticated)
- `DELETE /api/blog/comments/{id}/` - Delete a comment (authenticated)

### Interests API

- `GET /api/interests/interests/` - List all interests
- `GET /api/interests/interests/{slug}/` - Get interest details
- `GET /api/interests/projects/` - List all projects
- `GET /api/interests/projects/{slug}/` - Get project details

### Admin Panel

Access the Django admin panel at `http://localhost:8000/admin`

Use the superuser credentials created during setup.

## Models

### Blog Models

- **Category**: Blog post categories
- **Tag**: Blog post tags
- **Post**: Blog posts with rich content
- **Comment**: Post comments with nested replies

### Interests Models

- **Interest**: Personal interests with Bento Box display
- **Project**: Personal projects with progress tracking

## Development

### Adding New Models

1. Create model in `app/models.py`
2. Create serializer in `app/serializers.py`
3. Create viewset in `app/views.py`
4. Register URLs in `app/urls.py`
5. Register in admin in `app/admin.py`
6. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

### Testing

Run tests:

```bash
python manage.py test
```

## Production Deployment

1. Set `DEBUG=False` in `.env`
2. Update `ALLOWED_HOSTS` with your domain
3. Use PostgreSQL instead of SQLite
4. Configure static files serving
5. Set up proper CORS origins
6. Use environment variables for sensitive data

## License

MIT
