import supabase from '@/libs/supabase/server'
import PusherServer from 'pusher'
import { NextResponse } from 'next/server'
import messages from '@/utils/messages'

export async function POST (req) {
  const pusher = new PusherServer({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'sa1',
    useTLS: true
  })

  const { message, IdUser, IdChat, history, UserNumber } = await req.json()
  const newData = [...history, { user_num: UserNumber, message }]
  const now = new Date().toISOString().split('.')[0]

  const res = await pusher.get({ path: `/channels/presence-${IdChat}/users` })

  // The onlineUsers checks if both users are online
  let onlineUser = false
  if (res.status === 200) {
    const body = await res.json()
    const users = body.users
    users.forEach((UserId) => { if (UserId.id !== IdUser) onlineUser = true })
  }

  let error
  if (UserNumber === 1) {
    const { error: UpdateError } = await supabase.from('chats')
      .update({ content: newData, read_user_2: onlineUser, last_message: now })
      .eq('id_chat', IdChat)
    error = UpdateError
  }

  if (UserNumber === 2) {
    const { error: UpdateError } = await supabase.from('chats')
      .update({ content: newData, read_user_1: onlineUser, last_message: now })
      .eq('id_chat', IdChat)
    error = UpdateError
  }

  if (error) return { error: error.message }

  await pusher.trigger(`presence-${IdChat}`, 'chat', {
    user_num: UserNumber,
    message
  })

  return NextResponse.json({ message: messages.success.message_sent }, { status: 200 })
}
