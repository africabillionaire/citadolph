/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://citadolph.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://citadolph.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Only include the main page since this is a single-page site
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
        alternateRefs: config.alternateRefs ?? [],
      };
    }
    return null;
  },
};