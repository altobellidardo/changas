import { NextResponse } from 'next/server'
import { messages } from '@/utils/messages'
import checkCredentials from '@utils/checkCredentials'
import supabase from '@/libs/supabase'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST (request) {
  const body = await request.json()
  const { email, password } = body

  if (checkCredentials(email, password).error) {
    const { error: message, status } = checkCredentials(email, password)
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
  const { error } = await supabase.from('users').insert(newUser)

  if (error) {
    console.log(error)
    return NextResponse.json({ error: messages.error.error })
  }

  const { data: newUserCreated } = await supabase.from('users').select('*').eq('email', email).single()
  newUserCreated.password = undefined

  const token = jwt.sign(newUserCreated, 'secret')
  const response = NextResponse.json({ message: 'Registered' })
  response.cookies.set('token', token)

  return response
}
