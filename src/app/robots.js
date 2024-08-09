import { BASE_URL } from '@/constants'

export default function robots () {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
      // disallow: '/private/'
    },
    sitemap: 'http://' + BASE_URL + '/sitemap.xml'
  }
}
