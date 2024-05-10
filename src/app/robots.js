export default function robots () {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/'
    },
    sitemap: 'http://changas.site/sitemap.xml'
  }
}
