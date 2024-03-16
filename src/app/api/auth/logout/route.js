import { NextResponse } from 'next/server'

export async function POST (request) {
  const token = request.cookies.get('token')
  if (!token || token.value === '') {
    return NextResponse.json({ message: 'Not logged in' })
  }

  const response = NextResponse.json({ message: 'Logged out' })
  response.cookies.delete('token')

  return response
}
