// register route

// TODO: add DNI validation

import { getLocation } from '@/actions/getLocation'
import { getFields, errorMatch } from '@/app/auth/signup/dataHelp'
import supabase from '@/libs/supabase/server'
import checkCredentials from '@/utils/checkCredentials'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import messages from '@/utils/messages'
import jwt from 'jsonwebtoken'

export async function POST (request) {
  const req = new NextRequest(request)
  const formData = await req.formData()
  const data = getFields(formData)

  for (const [key, value] of Object.entries(data)) {
    if (value === '' || (key === 'dni' && value?.length !== 8)) {
      if (key !== 'phone') {
        const error = errorMatch.find((error) => error[0].includes(key))[1]

        return NextResponse.json({ error }, { status: 400 })
      }
    }
  }

  const credentialsValidation = checkCredentials(data.email, data.password)
  if (credentialsValidation.error) {
    const { error: message, status } = credentialsValidation
    // console.log('error 1')

    return NextResponse.json({ error: message }, { status })
  }

  const locationResponse = await getLocation(data.city, data.province, data.country, true)

  if (locationResponse.status !== 200) {
    // console.log('error 2')
    return NextResponse.json({ error: locationResponse.message }, { status: locationResponse.status })
  }

  const locStruct = await locationResponse.json()
  const location = locStruct.city + ', ' + locStruct.province + ', ' + locStruct.country

  // check if user already exists
  const { data: user } = await supabase.from('users').select('*').eq('email', data.email).single()

  if (user) {
    // console.log('error 3')
    return NextResponse.json(
      { error: messages.error.user_already_exists }, { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)
  const newUser = { email: data.email, password: hashedPassword }

  // create user
  const { data: newUserCreated, error } = await supabase.from('users').insert(newUser).select().single()
  if (error) {
    // console.log('error 4')
    return NextResponse.json({ error })
  }
  newUserCreated.password = undefined

  const userData = {
    id_user: newUserCreated.id_user,
    email: data.email,
    name: data.name,
    surname: data.surname,
    location,
    phone: data.phone.toString(),
    birth: data.birth,
    dni: data.dni,
    picture: data.image.size !== 0 // If the file size is 0 there is no such file
  }
  const { error: dataFail } = await supabase.from('users_data').insert(userData)

  if (dataFail) {
    // console.log('error 5', dataFail)
    return NextResponse.json({ error: dataFail })
  }

  // upload profile picture
  if (userData.picture) {
    const { error: profileFail } = await supabase.storage.from('profiles').upload(userData.id_user, data.image)
    if (profileFail) {
      // console.log('error 6')
      return NextResponse.json({ error: profileFail })
    }
  }

  newUserCreated.username = data.name + ' ' + data.surname

  const token = jwt.sign(newUserCreated, process.env.JWT_SECRET, { expiresIn: '180d' })
  const response = NextResponse.json({ message: messages.success.user_created }, { status: 200 })
  response.cookies.set('token', token)

  return response
}
