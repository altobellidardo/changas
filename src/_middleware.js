import { NextResponse } from 'next/server'

export async function middleware (request) {
  const token = request.cookies.get('token')

  if (!token || token.value === '') {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  const BASE_URL = request.nextUrl.origin
  const isAuthenticated = fetch(BASE_URL + '/api/auth/check', { method: 'GET' })
    .then(res => res.json())
    .then(data => data.isAuthenticated)

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (isAuthenticated) {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/perfil', '/contratar/:path*', '/postularse/:path*', '/chats']
}
