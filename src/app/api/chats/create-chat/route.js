import { createChat } from '@/actions/createChat'
import { NextResponse } from 'next/server'

export async function POST (req) {
  const { formData, IdUser, IdUser2 } = await req.json()

  const newIdChat = await createChat(formData, IdUser, IdUser2)

  return NextResponse.json({ newIdChat })
}
