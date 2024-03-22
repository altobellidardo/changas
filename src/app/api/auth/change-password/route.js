import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function POST (req) {
  const body = await req.json()
  const { password, token } = body

  if (!password) {
    return NextResponse.json(
      { error: messages.error.password_required }, { status: 400 }
    )
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: messages.error.password_invalid }, { status: 400 }
    )
  }

  if (!token) {
    const token = req.cookies.get('token')

    if (!token || token.value === '') {
      return NextResponse.json({ message: 'Not logged in' })
    }
  }

  const isValidToken = jwt.verify(token.value, process.env.JWT_SECRET)
  if (!isValidToken) {
    return NextResponse.json({ message: 'Invalid token' })
  }

  const { id: userId } = isValidToken

  const passwordHash = await bcrypt.hash(password, 10)

  const { error } = await supabase.from('users').update({ password: passwordHash }).eq('id', userId)

  if (error) {
    return NextResponse.json({ error: messages.error.error })
  }

  return NextResponse.json({ message: messages.success.password_changed }, { status: 200 })
}
