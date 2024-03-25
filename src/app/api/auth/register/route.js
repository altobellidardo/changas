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

  // check if user already exists
  const { data: user } = await supabase.from('users').select('*').eq('email', email).single()

  if (user) {
    return NextResponse.json(
      { error: messages.error.user_already_exists }, { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { email, password: hashedPassword }

  // create user
  const { data: newUserCreated, error } = await supabase.from('users').insert(newUser).select().single()
  if (error) {
    return NextResponse.json({ error: messages.error.error })
  }
  newUserCreated.password = undefined

  const token = jwt.sign(newUserCreated, process.env.JWT_SECRET)
  const response = NextResponse.json({ message: messages.success.user_created }, { status: 200 })
  response.cookies.set('token', token)

  return response
}
