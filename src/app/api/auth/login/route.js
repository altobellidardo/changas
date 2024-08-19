import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
import checkCredentials from '@/utils/checkCredentials'
import supabase from '@/libs/supabase/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST (request) {
  const body = await request.json()
  const { email, password } = body

  const credentialsValidation = checkCredentials(email, password)
  if (credentialsValidation.error) {
    const { error: message, status } = credentialsValidation
    return NextResponse.json({ error: message }, { status })
  }

  const { data: user } = await supabase.from('users').select('*').ilike('email', email).single()

  if (!user) {
    return NextResponse.json(
      { error: messages.error.user_not_found },
      { status: 400 }
    )
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return NextResponse.json(
      { error: messages.error.incorrect_password },
      { status: 400 }
    )
  }

  user.password = undefined

  const { data: userData } = await supabase.from('users_data').select('name, surname').eq('id_user', user.id_user).single()
  user.username = userData.name + ' ' + userData.surname

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '180d' })
  const response = NextResponse.json({ message: messages.success.user_logged }, { status: 201 })
  response.cookies.set('token', token)

  return response
}
