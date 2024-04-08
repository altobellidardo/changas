import supabase from '@/libs/supabase/server'
import PusherServer from 'pusher'
import { NextResponse } from 'next/server'
import messages from '@/utils/messages'

export async function POST (req) {
  const { message, IdUser, IdChat, history } = await req.json()
  const newData = [...history, { id_user: IdUser, message }]
  const { error } = await supabase.from('chats').update({ content: newData }).eq('id_chat', IdChat)
  if (error) return { error: error.message }

  const pusher = new PusherServer({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'sa1',
    useTLS: true
  })

  await pusher.trigger(`presence-${IdChat}`, 'chat', {
    id_user: IdUser,
    message
  })

  return NextResponse.json({ message: messages.success.message_sent }, { status: 200 })
}
