import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
import checkCredentials from '@/utils/checkCredentials'
import supabase from '@/libs/supabase/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST (request) {
  const body = await request.json()
  const { email, password, name, surname, city, province, country, phone, birth, dni } = body

  const credentialsValidation = checkCredentials(email, password)
  if (credentialsValidation.error) {
    const { error: message, status } = credentialsValidation
    return NextResponse.json({ error: message }, { status })
  }

  if (!name || !surname) {
    return NextResponse.json(
      { error: messages.error.name_required }, { status: 400 }
    )
  }

  if (!city || !province || !country) {
    return NextResponse.json(
      { error: messages.error.location_required }, { status: 400 }
    )
  }

  if (dni.length !== 8) {
    return NextResponse.json(
      { error: messages.error.dni_invalid }, { status: 400 }
    )
  }

  if (!birth) {
    return NextResponse.json(
      { error: messages.error.birth_required }, { status: 400 }
    )
  }

  // get base url from request
  const url = new URL(request.url)
  const BASE_URL = url.origin

  // Validate and return accurate location
  const locationResponse = await fetch(BASE_URL + '/api/geo/get-location', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ city, province, country, complete: true })
  })

  if (!locationResponse.ok) {
    return NextResponse.json({ error: messages.error.location_not_found }, { status: 404 })
  }

  const unstrucResponse = await locationResponse.json()
  const location = unstrucResponse.city + ', ' + unstrucResponse.province + ', ' + unstrucResponse.country

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

  const userData = { id_user: newUserCreated.id_user, email, name, surname, location, phone: phone.toString(), birth, dni }
  const { error: dataFail } = await supabase.from('users_data').insert(userData)

  if (dataFail) {
    return NextResponse.json({ error: messages.error.error })
  }

  newUserCreated.username = name + ' ' + surname

  const token = jwt.sign(newUserCreated, process.env.JWT_SECRET, { expiresIn: '180d' })
  const response = NextResponse.json({ message: messages.success.user_created }, { status: 200 })
  response.cookies.set('token', token)

  return response
}
