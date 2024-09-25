import { ADMINS } from '@/constants'
import { sendEmail } from '@/libs/resend/email'
import supabase from '@/libs/supabase/server'
import checkUser from '@/utils/checkUser'
import messages from '@/utils/messages'
import { NextRequest, NextResponse } from 'next/server'

export async function GET () {
  const id = '3789d804-f6ba-429d-bcbc-b7a5374132cb'
  const status = 'rejected'

  const { data, error } = await supabase
    .from('users_data')
    .update({ status })
    .eq('id_user', id)

  if (error) console.log(error)
  if (data) console.log(data)

  return NextResponse.json({ id })
}

export async function POST (request) {
  const req = new NextRequest(request)

  try {
    const body = await req.json()
    const { idUser, username, email, status, reason } = body
    console.log(body)
    if (!idUser || !status) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 404 })
    }

    if (status === 'rejected' && !reason) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 404 })
    }

    const token = req.cookies.get('token')
    if (!token || token.value === '') {
      return NextResponse.json({ message: 'Not valid token' })
    }
    const isValidToken = checkUser(token.value)
    if (!isValidToken) {
      return NextResponse.json({ message: 'Invalid token' })
    }

    const userEmail = isValidToken.email
    if (!ADMINS.includes(userEmail)) {
      return NextResponse.json({ error: messages.error.failed_user_update }, { status: 404 })
    }

    const { error } = await supabase
      .from('users_data')
      .update({ status })
      .eq('id_user', idUser)

    if (error) {
      return NextResponse.json({ error: messages.error.failed_user_update }, { status: 404 })
    }

    if (status === 'verified') {
      const { error: fail } = await supabase.storage.from('identities').remove([`${idUser}-dni`, `${idUser}-face`])
      if (fail) return NextResponse.json({ error: messages.error.failed_user_update })
    }

    if (status === 'rejected' && reason) {
      await sendEmail({
        from: 'equipo@changasred.com',
        to: email,
        subject: 'Identidad no validada - Changas Red',
        html: `
        Estimado ${username},
        Su identidad no ha podido ser validad por nuestros operadores. 
        Motivo: ${reason}.
        Si considera que esto fue un error, por favor contactese con este mail para que lo asistamos.
        Saludos cordiales,
        Equipo de Changas Red.`
      })
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request, no body' }, { status: 406 })
  }
}
