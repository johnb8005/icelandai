# Multi-stage Dockerfile for Bun + React application

# Build stage
FROM oven/bun:1.2.10-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
COPY bunfig.toml ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy application source
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1.2.10-alpine AS runtime

# Install runtime dependencies for security and process management
RUN apk add --no-cache \
    ca-certificates \
    tini

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json bun.lock* ./
COPY bunfig.toml ./
RUN bun install --frozen-lockfile --production

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy source files needed for runtime
COPY --from=builder /app/src ./src
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/tsconfig.json ./

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port 3000 (default Bun server port)
EXPOSE 3000

# Health check to ensure application is running
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/hello || exit 1

# Use tini as init system for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Start the production server
CMD ["bun", "start"]
