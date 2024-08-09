import { BASE_URL } from '@/constants'

export default function sitemap () {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: BASE_URL + '/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE_URL + '/auth/signin',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE_URL + '/auth/signup',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE_URL + '/nosotros',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE_URL + '/contacto',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE_URL + '/trabajos',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: BASE_URL + '/auth/forget-password',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.64
    },
    {
      url: BASE_URL + '/legal/terminos-condiciones',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.64
    },
    {
      url: BASE_URL + '/legal/privacidad',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.64
    }
  ]
}
