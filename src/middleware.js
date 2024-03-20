import { NextResponse } from 'next/server'

export async function middleware (request) {
  const token = request.cookies.get('token')

  if (!token || token.value === '') {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  const url = new URL(request.url)
  const BASE_URL = url.origin
  console.log('base', BASE_URL)
  const response = await fetch(BASE_URL + '/api/auth/check', {
    method: 'GET',
    headers: {
      cookie: `token=${token.value}`
    }
  })
  const data = await response.json()
  console.log('resp', data)

  if (data.error || !data.isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (data.isAuthenticated) {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/trabajos/:path*', '/private']
}
