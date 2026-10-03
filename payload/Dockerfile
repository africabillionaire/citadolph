# Production Dockerfile for Payload CMS
# Multi-stage build for smaller production image

# Base stage - install dependencies
FROM node:20-alpine AS base
WORKDIR /app

# Install system dependencies for sharp and postgres
RUN apk add --no-cache \
  vips-dev \
  postgresql-client \
  python3 \
  make \
  g++

# Install pnpm for faster installs
RUN corepack enable pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Build stage
FROM base AS builder
WORKDIR /app

# Copy source code
COPY . .

# Generate Payload types
RUN pnpm run payload:generate

# Build TypeScript
RUN pnpm run build

# Build Payload admin panel
RUN pnpm run payload:build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# Install runtime dependencies only
RUN apk add --no-cache \
  vips \
  postgresql-client \
  dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S payload -u 1001 -G nodejs

# Copy built application
COPY --from=builder --chown=payload:nodejs /app/dist ./dist
COPY --from=builder --chown=payload:nodejs /app/admin ./admin
COPY --from=builder --chown=payload:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=payload:nodejs /app/package.json ./package.json
COPY --from=builder --chown=payload:nodejs /app/payload-types.ts ./payload-types.ts

# Media directory for uploads
RUN mkdir -p media && chown payload:nodejs media

# Switch to non-root user
USER payload

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/server.js"]