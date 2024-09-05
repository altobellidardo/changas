import { ADMINS } from '@/constants'
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
    const { idUser, status } = body
    if (!idUser || !status) {
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

    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request, no body' }, { status: 406 })
  }
}
