# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Bun + React + Tailwind CSS + shadcn/ui web application template. It uses Bun as the JavaScript runtime and bundler, React 19 for the UI, Tailwind CSS v4 for styling, and includes pre-configured shadcn/ui components.

## Key Commands

**Development:**
```bash
bun install       # Install dependencies
bun dev          # Start dev server with hot reload
```

**Building:**
```bash
bun run build    # Build for production (outputs to dist/)
```

**Production:**
```bash
bun start        # Run production server
```

**Build Options:**
The build script supports many CLI options:
```bash
bun run build.ts --help              # Show all options
bun run build.ts --outdir=custom     # Custom output directory
bun run build.ts --minify=false      # Disable minification
bun run build.ts --source-map=none   # Disable source maps
```

## Architecture

### Tech Stack
- **Runtime:** Bun (v1.2.10+)
- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + CSS-in-JS
- **Components:** shadcn/ui (Radix UI based)
- **Forms:** react-hook-form + zod validation

### Project Structure
- `src/index.tsx` - Server entry point with API routes
- `src/App.tsx` - Main React component
- `src/components/ui/` - shadcn/ui component library
- `build.ts` - Custom build script with extensive CLI options
- Path alias: `@/` maps to `./src/`

### API Routes
The server (src/index.tsx) includes example API endpoints:
- `GET /api/hello` - Returns generic greeting
- `GET /api/hello/:name` - Returns personalized greeting

### Key Features
- Hot Module Replacement in development
- Server-side rendering capabilities
- TypeScript with strict mode
- Modern React 19 features
- Tailwind CSS v4 with animations
- Form validation with zod schemas

## Important Notes

1. **Bun Required:** This project uses Bun, not Node.js. Ensure Bun is installed.
2. **No Test/Lint Commands:** Currently no testing or linting setup. Consider adding if needed.
3. **Environment Variables:** Client-side env vars must be prefixed with `BUN_PUBLIC_`
4. **Build Behavior:** The build script automatically cleans the output directory
5. **Development:** Use `bun dev` for hot reload during development