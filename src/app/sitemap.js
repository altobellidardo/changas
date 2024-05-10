const BASE = 'https://changas.site'

export default function sitemap () {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: BASE + '/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE + '/auth/signin',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE + '/auth/signup',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE + '/nosotros',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE + '/trabajos',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE + '/auth/forget-password',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.64
    }
  ]
}
