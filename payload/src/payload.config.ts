import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import { Users } from './collections/Users.js'
import { Media } from './collections/Media.js'
import { Pages } from './collections/Pages.js'
import { Posts } from './collections/Posts.js'
import { Categories } from './collections/Categories.js'
import { Header } from './globals/Header.js'
import { Footer } from './globals/Footer.js'

const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)

const getEnv = (key: string): string | undefined => process.env[key]

const isProduction = getEnv('NODE_ENV') === 'production'

// Validate required environment variables
const requiredEnvVars = ['PAYLOAD_SECRET', 'DATABASE_URL']
for (const envVar of requiredEnvVars) {
  if (!getEnv(envVar)) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}

// Validate PAYLOAD_SECRET length
const payloadSecret = getEnv('PAYLOAD_SECRET')
if (payloadSecret && payloadSecret.length < 32) {
  throw new Error('PAYLOAD_SECRET must be at least 32 characters long')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: __dirname,
    },
    // Disable auto-login in production for security
    autoLogin: !isProduction ? { email: 'admin@example.com', password: 'admin123456' } : false,
    // Custom admin panel configuration
    meta: {
      titleSuffix: ' - Payload CMS',
    },
  },
  collections: [Users, Media, Pages, Posts, Categories],
  globals: [Header, Footer],
  editor: lexicalEditor({
    // Configure Lexical editor features
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Add custom features here if needed
    ],
  }),
  secret: payloadSecret as string,
  typescript: {
    outputFile: 'payload-types.ts',
    // declare: { generateDeclarationFiles: true }, // Not a valid option in Payload 3.x
  },
  sharp,
  db: postgresAdapter({
    pool: {
      connectionString: getEnv('DATABASE_URL') as string,
      // Production pool settings
      max: isProduction ? 20 : 10,
      min: isProduction ? 2 : 0,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      // SSL is required for Neon
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    },
    migrationDir: 'src/migrations',
    // Enable push protection in production
    push: !isProduction,
  }),
  plugins: [
    seoPlugin({
      collections: ['pages', 'posts'],
      globals: ['header', 'footer'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        if (doc?.title) return `${doc.title} | ${getEnv('NEXT_PUBLIC_SITE_NAME') || 'My Site'}`
        return getEnv('NEXT_PUBLIC_SITE_NAME') || 'My Site'
      },
      generateDescription: ({ doc }) => doc?.excerpt || doc?.meta?.description || 'Default site description',
      generateURL: ({ doc }) => {
        if (doc?.slug) return `${getEnv('NEXT_PUBLIC_SITE_URL') || 'http://localhost:3000'}/${doc.slug}`
        return getEnv('NEXT_PUBLIC_SITE_URL') || 'http://localhost:3000'
      },
      tabbedUI: true,
    }),
  ],
  cors: [
    getEnv('FRONTEND_URL') || 'http://localhost:3000',
    getEnv('NEXT_PUBLIC_SITE_URL') || 'http://localhost:3000',
  ].filter(Boolean) as string[],
  csrf: [
    getEnv('FRONTEND_URL') || 'http://localhost:3000',
    getEnv('NEXT_PUBLIC_SITE_URL') || 'http://localhost:3000',
  ].filter(Boolean) as string[],
  // Rate limiting - configure via reverse proxy (nginx, Vercel, etc.)
  // rateLimit: { window: 900000, max: 100 },
  // Email configuration (optional) - requires @payloadcms/email-nodemailer
  // email: getEnv('EMAIL_SMTP_HOST')
  //   ? nodemailerAdapter({
  //       transportOptions: {
  //         host: getEnv('EMAIL_SMTP_HOST') as string,
  //         port: parseInt(getEnv('EMAIL_SMTP_PORT') || '587', 10),
  //         auth: {
  //           user: getEnv('EMAIL_SMTP_USER') as string,
  //           pass: getEnv('EMAIL_SMTP_PASS') as string,
  //         },
  //       },
  //       fromAddress: getEnv('EMAIL_FROM') || 'Payload CMS <noreply@example.com>',
  //       fromName: 'Payload CMS',
  //     })
  //   : undefined,
  // Localization
  localization: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
    fallback: true,
  },
  // Jobs queue for async tasks
  jobs: {
    tasks: [],
    workflows: [],
  },
})