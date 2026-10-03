# Payload CMS with Neon PostgreSQL

A production-ready headless CMS built with Payload 3.x and Neon serverless PostgreSQL.

## Features

- **Payload CMS 3.x** - Latest version with App Router support
- **Neon PostgreSQL** - Serverless PostgreSQL with connection pooling
- **PostgreSQL Adapter** - Native PostgreSQL support via `@payloadcms/db-postgres`
- **Lexical Editor** - Rich text editing with `@payloadcms/richtext-lexical`
- **SEO Plugin** - Built-in SEO management via `@payloadcms/plugin-seo`
- **TypeScript** - Full type safety with auto-generated types
- **Docker Support** - Multi-stage production builds
- **Security Hardened** - Helmet-style headers, rate limiting, input validation
- **Observability** - Health checks, readiness probes, structured logging

## Collections

| Collection | Description | Features |
|------------|-------------|----------|
| **Users** | Authentication with roles | Admin/Editor/User roles, login tracking, password reset |
| **Media** | File uploads with image resizing | Multiple image sizes, PDF/video support, focal points |
| **Pages** | Static pages with SEO | Versioning, drafts, preview, SEO fields |
| **Posts** | Blog posts with categories | Authors, tags, categories, versioning, SEO |
| **Categories** | Hierarchical categories | Parent/child, color coding, post counts |

## Globals

| Global | Description |
|--------|-------------|
| **Header** | Site navigation, logo, dropdown menus, CTA |
| **Footer** | Copyright, link columns, social links, newsletter |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm
- Neon account or local PostgreSQL

### Quick Start with Docker

```bash
cd payload
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Payload CMS on port 3001
- Admin panel at http://localhost:3001/admin

### Local Development (without Docker)

```bash
# Install dependencies
cd payload
pnpm install

# Copy environment template
cp .env.example .env

# Configure .env with your Neon credentials
# Get DATABASE_URL and DATABASE_URL_POOLED from https://console.neon.tech

# Push schema to database
pnpm run db:push

# Start development server
pnpm run dev
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PAYLOAD_SECRET` | Yes | 32+ character secret (generate: `openssl rand -base64 32`) |
| `DATABASE_URL` | Yes | Direct Neon connection string |
| `DATABASE_URL_POOLED` | Yes | Pooled Neon connection string |
| `NEXT_PUBLIC_SITE_URL` | No | Frontend URL for previews |
| `FRONTEND_URL` | No | CORS/CSRF origin |
| `PORT` | No | Server port (default: 3001) |
| `BLOB_READ_WRITE_TOKEN` | No | Vercel Blob storage token |
| `EMAIL_SMTP_*` | No | SMTP configuration for auth emails |
| `SENTRY_DSN` | No | Error tracking |
| `RATE_LIMIT_WINDOW_MS` | No | Rate limit window (default: 900000) |
| `RATE_LIMIT_MAX_REQUESTS` | No | Max requests per window (default: 100) |

### Database Operations

```bash
# Push schema changes to database (development)
pnpm run db:push

# Create a new migration
pnpm run payload:migrate:create

# Run pending migrations
pnpm run payload:migrate

# Open Drizzle Studio (database GUI)
pnpm run db:studio
```

### Generate Types

```bash
pnpm run payload:generate
```

Creates `payload-types.ts` with full TypeScript types for all collections and globals.

### Build for Production

```bash
# Build TypeScript and Payload admin
pnpm run build
pnpm run payload:build

# Start production server
pnpm start
```

### Docker Production Build

```bash
# Build production image
docker build -t payload-cms .

# Run with environment file
docker run --env-file .env -p 3001:3001 payload-cms
```

## Project Structure

```
payload/
├── src/
│   ├── collections/       # Collection configurations
│   │   ├── Users.ts
│   │   ├── Media.ts
│   │   ├── Pages.ts
│   │   ├── Posts.ts
│   │   └── Categories.ts
│   ├── globals/           # Global configurations
│   │   ├── Header.ts
│   │   └── Footer.ts
│   ├── payload.config.ts  # Main Payload configuration
│   ├── server.ts          # Express server entry point
│   └── index.ts           # Module entry point
├── .env                   # Environment variables (not committed)
├── .env.example           # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
├── eslint.config.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## API Endpoints

### REST API
- `GET /api/:collection` - List documents
- `GET /api/:collection/:id` - Get single document
- `POST /api/:collection` - Create document
- `PATCH /api/:collection/:id` - Update document
- `DELETE /api/:collection/:id` - Delete document

### GraphQL
- `POST /graphql` - GraphQL endpoint
- `GET /graphql` - GraphQL Playground (development)

### Admin Panel
- `GET /admin` - Payload admin dashboard

### Health Checks
- `GET /health` - Basic health check
- `GET /ready` - Readiness probe (checks database connectivity)

## Neon Integration

This project is configured to work with Neon's serverless PostgreSQL:

- Uses pooled connection (`DATABASE_URL_POOLED`) for serverless functions
- Uses direct connection (`DATABASE_URL`) for migrations and CLI
- Supports Neon's branching for preview deployments
- Connection pooling handled automatically by the adapter

### Neon Setup

1. Create a Neon project at https://console.neon.tech
2. Copy the connection strings:
   - **Direct connection** → `DATABASE_URL`
   - **Pooled connection** → `DATABASE_URL_POOLED`
3. Add to `.env` file

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy - Vercel will auto-detect Payload
4. Configure `DATABASE_URL_POOLED` for serverless functions

### Docker (Any Platform)

```bash
docker build -t payload-cms .
docker run -d \
  --name payload \
  --env-file .env \
  -p 3001:3001 \
  --restart unless-stopped \
  payload-cms
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payload-cms
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payload-cms
  template:
    metadata:
      labels:
        app: payload-cms
    spec:
      containers:
      - name: payload
        image: payload-cms:latest
        ports:
        - containerPort: 3001
        envFrom:
        - secretRef:
            name: payload-secrets
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3001
          initialDelaySeconds: 10
          periodSeconds: 5
```

## Best Practices

1. **Secrets Management** - Never commit `.env` files; use secret managers in production
2. **Database Migrations** - Always create migrations for schema changes
3. **Type Generation** - Run `payload generate:types` after schema changes
4. **Access Control** - Use the built-in access control for all collections
5. **Versioning** - Enable drafts for content that needs review workflow
6. **Image Optimization** - Configure appropriate image sizes in Media collection
7. **Rate Limiting** - Configure appropriate limits for your traffic

## Security Considerations

- PAYLOAD_SECRET must be 32+ characters in production
- CORS/CSRF origins restricted to configured frontend URLs
- Rate limiting enabled by default
- Security headers set on all responses
- Non-root user in Docker container
- SQL injection protection via parameterized queries
- Input validation on all API endpoints

## Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [PostgreSQL Adapter](https://payloadcms.com/docs/database/postgres)
- [Lexical Editor](https://payloadcms.com/docs/rich-text/lexical)
- [SEO Plugin](https://payloadcms.com/docs/plugins/seo)
- [Deployment Guide](https://payloadcms.com/docs/deployment/overview)

## License

MIT