# Docker Setup Guide

This project includes Docker support for both development and production environments.

## Prerequisites

- Docker (20.10+)
- Docker Compose (1.29+)

## Quick Start

### Production Build

Build and run the production container:

```bash
# Using docker-compose
docker-compose up -d

# Or using Docker directly
docker build -t icelandai .
docker run -p 3000:3000 icelandai
```

The application will be available at `http://localhost:3000`

### Development Mode

Run the development container with hot reload:

```bash
docker-compose -f docker-compose.dev.yml up
```

This mounts your source files as volumes, so changes are reflected immediately.

## Docker Commands

### Build the Image

```bash
docker build -t icelandai .
```

### Run the Container

```bash
docker run -p 3000:3000 --name icelandai-web icelandai
```

### Stop the Container

```bash
docker stop icelandai-web
```

### Remove the Container

```bash
docker rm icelandai-web
```

### View Logs

```bash
docker logs icelandai-web

# Follow logs
docker logs -f icelandai-web
```

## Docker Compose Commands

### Start Services

```bash
# Production
docker-compose up -d

# Development
docker-compose -f docker-compose.dev.yml up
```

### Stop Services

```bash
docker-compose down
```

### Rebuild and Start

```bash
docker-compose up -d --build
```

### View Logs

```bash
docker-compose logs -f web
```

## Architecture

### Multi-Stage Build

The Dockerfile uses a multi-stage build approach:

1. **Builder Stage**: Installs all dependencies and builds the application
2. **Runtime Stage**: Creates a minimal production image with only necessary files

### Security Features

- Uses official Bun Alpine image for minimal attack surface
- Runs as non-root user (appuser:1001)
- Includes health checks
- Uses tini as init system for proper signal handling

### Environment Variables

You can pass environment variables to the container:

```bash
docker run -p 3000:3000 -e NODE_ENV=production icelandai
```

Or using docker-compose, add them to the `environment` section in `docker-compose.yml`.

### Port Mapping

By default, the application runs on port 3000. You can map to a different host port:

```bash
docker run -p 8080:3000 icelandai
```

Now accessible at `http://localhost:8080`

## Health Checks

The container includes a health check that verifies the application is responding:

```bash
# Check container health status
docker ps

# Inspect health check details
docker inspect --format='{{json .State.Health}}' icelandai-web
```

## Troubleshooting

### Container won't start

Check the logs:
```bash
docker logs icelandai-web
```

### Health check failing

Ensure the application is running and the `/api/hello` endpoint is accessible:
```bash
docker exec -it icelandai-web wget -O- http://localhost:3000/api/hello
```

### Build issues

Clear Docker cache and rebuild:
```bash
docker-compose down
docker system prune -f
docker-compose up -d --build
```

## Production Deployment

For production deployment:

1. Set appropriate environment variables
2. Consider using a reverse proxy (nginx, traefik) for SSL termination
3. Use Docker secrets for sensitive data
4. Set resource limits in docker-compose.yml:

```yaml
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 512M
    reservations:
      cpus: '0.5'
      memory: 256M
```

## Development Workflow

1. Make changes to source files
2. If using dev compose, changes hot reload automatically
3. If using production compose, rebuild:
   ```bash
   docker-compose up -d --build
   ```
