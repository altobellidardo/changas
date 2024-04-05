import { createChat } from '@/actions/createChat'
import { NextResponse } from 'next/server'

export async function POST (req) {
  const { message, IdUser, IdUser2 } = await req.json()

  const newIdChat = await createChat(message, IdUser, IdUser2)

  return NextResponse.json({ newIdChat })
}
