# bun-react-tailwind-shadcn-template

A modern web application built with Bun, React 19, Tailwind CSS v4, and shadcn/ui.

## Local Development

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

## Docker Support

This project includes full Docker support for both development and production environments.

### Quick Start with Docker

```bash
# Production
docker-compose up -d

# Development with hot reload
docker-compose -f docker-compose.dev.yml up
```

For detailed Docker instructions, see [DOCKER.md](./DOCKER.md).

## Technology Stack

- **Runtime:** Bun v1.2.10+
- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix UI based)
- **Forms:** react-hook-form + zod validation

This project was created using `bun init` in bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
