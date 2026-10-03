import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding database...')

  // Create admin user
  const adminEmail = 'admin@example.com'
  const adminPassword = 'admin123456'

  try {
    const existingAdmin = await payload.find({
      collection: 'users',
      where: { email: { equals: adminEmail } },
      limit: 1,
    })

    if (existingAdmin.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: adminEmail,
          password: adminPassword,
          name: 'Admin User',
          role: 'admin',
        },
      })
      console.log('✅ Created admin user:', adminEmail)
    } else {
      console.log('ℹ️ Admin user already exists')
    }
  } catch (error) {
    console.error('❌ Failed to create admin user:', error)
  }

  // Create default categories
  const categories = [
    { name: 'Technology', slug: 'technology', color: '#3B82F6' },
    { name: 'Design', slug: 'design', color: '#EC4899' },
    { name: 'Business', slug: 'business', color: '#10B981' },
    { name: 'Tutorial', slug: 'tutorial', color: '#F59E0B' },
  ]

  for (const cat of categories) {
    try {
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: cat.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'categories',
          data: cat,
        })
        console.log(`✅ Created category: ${cat.name}`)
      }
    } catch (error) {
      console.error(`❌ Failed to create category ${cat.name}:`, error)
    }
  }

  // Create default pages
  const pages = [
    {
      title: 'Home',
      slug: 'home',
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Welcome to Payload CMS!' }],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      title: 'About',
      slug: 'about',
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'About our company and mission.' }],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      title: 'Contact',
      slug: 'contact',
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Get in touch with us.' }],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  ]

  for (const page of pages) {
    try {
      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: page.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'pages',
          data: page,
        })
        console.log(`✅ Created page: ${page.title}`)
      }
    } catch (error) {
      console.error(`❌ Failed to create page ${page.title}:`, error)
    }
  }

  // Create sample posts
  const techCategory = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'technology' } },
    limit: 1,
  })

  const adminUser = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
  })

  const techCat = techCategory.docs[0]
  const admin = adminUser.docs[0]

  if (techCat && admin) {
    const posts = [
      {
        title: 'Getting Started with Payload CMS',
        slug: 'getting-started-with-payload-cms',
        status: 'published',
        publishedAt: new Date().toISOString(),
        author: admin.id,
        category: techCat.id,
        tags: [{ tag: 'payload' }, { tag: 'cms' }, { tag: 'tutorial' }],
        excerpt: 'Learn how to build a modern headless CMS with Payload 3.x',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: 'Payload CMS is a powerful headless CMS built for developers.' }],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        title: 'Why Neon PostgreSQL for Your CMS',
        slug: 'why-neon-postgresql-for-your-cms',
        status: 'published',
        publishedAt: new Date().toISOString(),
        author: admin.id,
        category: techCat.id,
        tags: [{ tag: 'neon' }, { tag: 'postgresql' }, { tag: 'database' }],
        excerpt: 'Discover the benefits of serverless PostgreSQL with Neon',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: 'Neon provides serverless PostgreSQL with branching and autoscaling.' }],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    ]

    for (const post of posts) {
      try {
        const existing = await payload.find({
          collection: 'posts',
          where: { slug: { equals: post.slug } },
          limit: 1,
        })

        if (existing.docs.length === 0) {
          await payload.create({
            collection: 'posts',
            data: post,
          })
          console.log(`✅ Created post: ${post.title}`)
        }
      } catch (error) {
        console.error(`❌ Failed to create post ${post.title}:`, error)
      }
    }
  }

  console.log('\n🎉 Seeding complete!')
  console.log('\n📝 Default credentials:')
  console.log('   Email: admin@example.com')
  console.log('   Password: admin123456')
  console.log('\n⚠️  Change these credentials immediately in production!')
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  })