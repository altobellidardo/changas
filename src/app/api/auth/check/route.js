import supabase from '@/libs/supabase/server'
import checkUser from '@/utils/checkUser'
import messages from '@/utils/messages'
import { NextResponse } from 'next/server'

export async function GET (req) {
  const token = req.cookies.get('token')

  if (!token || token.value === '') {
    return NextResponse.json({ message: 'Not logged in' })
  }

  const isValidToken = checkUser(token.value)
  if (!isValidToken) {
    return NextResponse.json({ message: 'Invalid token' })
  }

  const { id: userId } = isValidToken

  const { data: user, error } = await supabase.from('users').select('*').eq('id', userId).single()
  if (!user) {
    return NextResponse.json({ message: messages.error.user_not_found }, { status: 404 })
  }

  if (error) {
    return NextResponse.json({ error: messages.error.error })
  }

  return NextResponse.json({ isAuthenticated: true, message: messages.success.athorized, user }, { status: 200 })
}
