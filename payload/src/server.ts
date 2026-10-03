import 'dotenv/config'
import express from 'express'
import { getPayload, type PayloadRequest } from 'payload'
import config from './payload.config.js'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { existsSync } from 'fs'

const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)

const getEnv = (key: string): string | undefined => process.env[key]

const app = express()
const PORT = parseInt(getEnv('PORT') || '3001', 10)

// Trust proxy for proper IP detection behind reverse proxies (Vercel, nginx, etc.)
app.set('trust proxy', 1)

// Security headers middleware (lightweight alternative to helmet)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  next()
})

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    const logLevel = res.statusCode >= 400 ? 'warn' : 'info'
    console[logLevel](`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`)
  })
  next()
})

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint (before Payload middleware for minimal overhead)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: getEnv('NODE_ENV') || 'development',
  })
})

// Readiness check for Kubernetes/container orchestration
app.get('/ready', async (req, res) => {
  try {
    const payload = await getPayload({ config })
    await payload.db.pool.query('SELECT 1')
    res.json({ status: 'ready', timestamp: new Date().toISOString() })
  } catch (error) {
    res.status(503).json({
      status: 'not ready',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null

// Helper to create a PayloadRequest from Express request
function createPayloadRequest(req: express.Request): PayloadRequest {
  // Create a minimal PayloadRequest that satisfies the interface
  // Using type assertion since PayloadRequest is a complex intersection type
  return {
    payload: payloadInstance!,
    user: (req as any).user || null,
    headers: req.headers as unknown as Headers,
    method: req.method,
    url: req.url,
    query: req.query as Record<string, string>,
    body: req.body,
    ip: req.ip,
    route: req.route,
    path: req.path,
    hostname: req.hostname,
    protocol: req.protocol,
    secure: req.secure,
    get: req.get.bind(req),
    // Required by PayloadRequest (from Partial<Request>)
    hash: '',
    href: '',
    origin: '',
    pathname: '',
    search: '',
    host: req.get('host') || '',
    port: '',
    searchParams: new URLSearchParams(),
    t: (key: string) => key,
    // Required by PayloadRequestData
    data: req.body as Record<string, unknown>,
    file: undefined,
    files: (req as any).files as Record<string, any>,
    // Required by CustomPayloadRequestProperties
    context: {},
    i18n: { t: (key: string) => key } as any,
    payloadAPI: 'REST',
    payloadDataLoader: {} as any,
  } as unknown as PayloadRequest
}

async function start() {
  try {
    // Initialize Payload
    payloadInstance = await getPayload({ config })

    // Serve static admin panel if built (run 'npm run payload:build' first)
    const adminPath = resolve(__dirname, '../admin')
    const adminIndexPath = resolve(adminPath, 'index.html')
    const adminExists = existsSync(adminIndexPath)

    if (adminExists) {
      app.use('/admin', express.static(adminPath, {
        index: 'index.html',
        maxAge: '1d',
        etag: true,
      }))

      // Fallback to index.html for admin panel SPA routing
      app.get('/admin/*', (req, res) => {
        res.sendFile(adminIndexPath, (err) => {
          if (err) {
            res.status(404).json({ error: 'Admin panel not found' })
          }
        })
      })
      console.log(`⚙️  Admin Panel: http://localhost:${PORT}/admin (serving from ./admin)`)
    } else {
      // Admin panel not built - serve a helpful page with instructions
      app.get('/admin', (req, res) => {
        res.setHeader('Content-Type', 'text/html')
        res.send(
          `<!DOCTYPE html>
          <html>
            <head>
              <title>Payload CMS - Admin Panel Not Built</title>
              <style>
                body { font-family: system-ui, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; line-height: 1.6; }
                .card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px; background: #fafafa; }
                h1 { color: #1a1a1a; margin-top: 0; }
                code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
                pre { background: #1a1a1a; color: #e0e0e0; padding: 16px; border-radius: 8px; overflow-x: auto; }
                .btn { display: inline-block; background: #0066cc; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px; }
                .btn:hover { background: #0052a3; }
              </style>
            </head>
            <body>
              <div class="card">
                <h1>⚙️ Payload Admin Panel</h1>
                <p>The admin panel has not been built yet. You need to build it first.</p>
                <p>Run the following command in your terminal:</p>
                <pre>npm run payload:build</pre>
                <p>This will compile the Next.js admin panel into the <code>./admin</code> directory.</p>
                <p>After building, refresh this page to access the admin panel.</p>
                <a href="/health" class="btn">Check Server Health</a>
                <a href="/api" class="btn" style="margin-left: 10px; background: #28a745;">View REST API</a>
              </div>
            </body>
          </html>`
        )
      })

      // Catch-all for admin routes
      app.get('/admin/*', (req, res) => {
        res.redirect('/admin')
      })
      console.log(`⚙️  Admin Panel: http://localhost:${PORT}/admin (not built - run 'npm run payload:build')`)
    }

    // Serve static media files in production
    if (getEnv('NODE_ENV') === 'production') {
      const mediaDir = resolve(__dirname, '../media')
      app.use('/media', express.static(mediaDir, {
        maxAge: '1d',
        etag: true,
        lastModified: true,
      }))
    }

    // REST API endpoints using Local API with proper access control
    
    // GET /api/:collection - List documents
    app.get('/api/:collection', async (req, res) => {
      try {
        if (!payloadInstance) throw new Error('Payload not initialized')
        
        const { collection } = req.params
        const { limit = 10, page = 1, where, sort, depth, draft } = req.query
        
        const payloadReq = createPayloadRequest(req)
        
        const result = await payloadInstance.find({
          collection,
          limit: parseInt(limit as string, 10),
          page: parseInt(page as string, 10),
          where: where ? JSON.parse(where as string) : undefined,
          sort: sort as string,
          depth: depth ? parseInt(depth as string, 10) : undefined,
          draft: draft === 'true',
          req: payloadReq,
        })
        
        res.json(result)
      } catch (error) {
        console.error('Find error:', error)
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
      }
    })

    // GET /api/:collection/:id - Get single document
    app.get('/api/:collection/:id', async (req, res) => {
      try {
        if (!payloadInstance) throw new Error('Payload not initialized')
        
        const { collection, id } = req.params
        const { depth, draft } = req.query
        
        const payloadReq = createPayloadRequest(req)
        
        const doc = await payloadInstance.findByID({
          collection,
          id,
          depth: depth ? parseInt(depth as string, 10) : undefined,
          draft: draft === 'true',
          req: payloadReq,
        })
        
        if (!doc) {
          return res.status(404).json({ error: 'Not found' })
        }
        
        res.json(doc)
      } catch (error) {
        console.error('FindByID error:', error)
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
      }
    })

    // POST /api/:collection - Create document
    app.post('/api/:collection', async (req, res) => {
      try {
        if (!payloadInstance) throw new Error('Payload not initialized')
        
        const { collection } = req.params
        const data = req.body
        
        const payloadReq = createPayloadRequest(req)
        
        const doc = await payloadInstance.create({
          collection,
          data,
          req: payloadReq,
        })
        
        res.status(201).json(doc)
      } catch (error) {
        console.error('Create error:', error)
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
      }
    })

    // PATCH /api/:collection/:id - Update document
    app.patch('/api/:collection/:id', async (req, res) => {
      try {
        if (!payloadInstance) throw new Error('Payload not initialized')
        
        const { collection, id } = req.params
        const data = req.body
        
        const payloadReq = createPayloadRequest(req)
        
        const doc = await payloadInstance.update({
          collection,
          id,
          data,
          req: payloadReq,
        })
        
        res.json(doc)
      } catch (error) {
        console.error('Update error:', error)
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
      }
    })

    // DELETE /api/:collection/:id - Delete document
    app.delete('/api/:collection/:id', async (req, res) => {
      try {
        if (!payloadInstance) throw new Error('Payload not initialized')
        
        const { collection, id } = req.params
        
        const payloadReq = createPayloadRequest(req)
        
        await payloadInstance.delete({
          collection,
          id,
          req: payloadReq,
        })
        
        res.status(204).send()
      } catch (error) {
        console.error('Delete error:', error)
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
      }
    })

    // GET /api/globals/:slug - Get global
    app.get('/api/globals/:slug', async (req, res) => {
      try {
        if (!payloadInstance) throw new Error('Payload not initialized')
        
        const { slug } = req.params
        const { depth } = req.query
        
        const payloadReq = createPayloadRequest(req)
        
        const global = await payloadInstance.findGlobal({
          slug,
          depth: depth ? parseInt(depth as string, 10) : undefined,
          req: payloadReq,
        })
        
        if (!global) {
          return res.status(404).json({ error: 'Not found' })
        }
        
        res.json(global)
      } catch (error) {
        console.error('FindGlobal error:', error)
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
      }
    })

    // Global error handler
    app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error('Unhandled error:', err)
      
      // Payload validation errors
      if (err.name === 'ValidationError') {
        return res.status(400).json({
          error: 'Validation Error',
          message: err.message,
        })
      }

      // Database errors
      if (err.message.includes('duplicate key')) {
        return res.status(409).json({
          error: 'Conflict',
          message: 'A record with this value already exists',
        })
      }

      // Default error response
      res.status(500).json({
        error: 'Internal Server Error',
        message: getEnv('NODE_ENV') === 'production' 
          ? 'An unexpected error occurred' 
          : err.message,
      })
    })

    // 404 handler for non-API routes
    app.use((req, res) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/admin')) {
        return res.status(404).json({ error: 'Not found' })
      }
      res.status(404).json({ error: 'Route not found' })
    })

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`\n🚀 Payload CMS running on http://localhost:${PORT}`)
      console.log(`📚 REST API: http://localhost:${PORT}/api`)
      console.log(`❤️  Health: http://localhost:${PORT}/health`)
      console.log(`🔄 Ready: http://localhost:${PORT}/ready`)
      console.log(`\n📖 Collections: Users, Media, Pages, Posts, Categories`)
      console.log(`📖 Globals: Header, Footer`)
      console.log(`\n💡 For GraphQL: Use the Local API or run 'payload dev' for development`)
    })

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      console.log(`\n${signal} received, shutting down gracefully...`)
      server.close(async () => {
        try {
          if (payloadInstance) {
            await payloadInstance.db.pool.end()
          }
          console.log('Database connections closed')
          process.exit(0)
        } catch (error) {
          console.error('Error during shutdown:', error)
          process.exit(1)
        }
      })

      // Force close after 30 seconds
      setTimeout(() => {
        console.error('Forced shutdown after timeout')
        process.exit(1)
      }, 30000)
    }

    process.on('SIGTERM', () => shutdown('SIGTERM'))
    process.on('SIGINT', () => shutdown('SIGINT'))
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()