// register route

import { NextRequest, NextResponse } from 'next/server'

export async function POST (request) {
  const req = new NextRequest(request)
  const data = await req.formData()
  console.log(data)
  return NextResponse.json({ message: 'register route' })
}
