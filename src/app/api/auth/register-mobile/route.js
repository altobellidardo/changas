// register route

// TODO: add DNI validation
import { decode } from 'base64-arraybuffer'
import { getLocation } from '@/actions/getLocation'
import supabase from '@/libs/supabase/server'
import checkCredentials from '@/utils/checkCredentials'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import messages from '@/utils/messages'

export async function POST (request) {
  const data = await request.json()

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

  // check if user's DNI already exists
  const { data: dniExists } = await supabase.from('users_data').select('*').eq('dni', data.dni).single()

  if (dniExists) {
    // console.log('error DNI')
    return NextResponse.json(
      { error: messages.error.dni_already_registered }, { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)
  const newUser = { email: data.email, password: hashedPassword }

  // create user
  const { data: newUserCreated, error } = await supabase.from('users').insert(newUser).select().single()
  if (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error al crear usuario' })
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
    picture: data.image !== null // If the file size is 0 there is no such file
  }
  const { error: dataFail } = await supabase.from('users_data').insert(userData)

  if (dataFail) {
    console.log(dataFail)
    return NextResponse.json({ error: 'Error al cargar datos personales' })
  }

  // upload profile picture
  if (userData.picture) {
    const { error: profileFail } = await supabase.storage.from('profiles').upload(userData.id_user, decode(data.image.base64), {
      contentType: 'image/jpeg' // The Expo app sends all images as JPEG
    })
    if (profileFail) {
      console.log(profileFail)
      return NextResponse.json({ error: messages.error.image_upload_failed })
    }
  }

  newUserCreated.username = data.name + ' ' + data.surname

  const response = NextResponse.json({ message: messages.success.user_created, id_user: userData.id_user }, { status: 200 })

  return response
}
