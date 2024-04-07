import { createChat } from '@/actions/createChat'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'
import { NextResponse } from 'next/server'

export async function POST (req) {
  const { message, IdUser, IdUser2, Username2 } = await req.json()
  const { data } = await supabase.from('users_data').select('name, surname').eq('id_user', IdUser).single()
  const Username1 = data.name + ' ' + data.surname
  const newIdChat = await createChat(message, IdUser, IdUser2, Username1, Username2)

  return NextResponse.json({ message: messages.success.chat_created, newIdChat }, { status: 201 })
}
