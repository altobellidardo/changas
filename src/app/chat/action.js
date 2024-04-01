'use server'

import supabase from '@/libs/supabase/server'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { getMessages } from '@/actions/getMessages'
import Pusher from 'pusher'

export async function postData (formData, IdChat) {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  // Retrieve data from JWT
  const { id_user: IdUser } = isAuthenticated

  const { content: history } = await getMessages(IdChat)

  // Retrieve data from formData
  const message = formData.get('message')

  const newData = [...history, { id_user: IdUser, message }]
  const { error } = await supabase.from('chats').update({ content: newData }).eq('id_chat', IdChat)
  if (error) return { error: error.message }

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'sa1',
    useTLS: true
  })

  await pusher.trigger(IdChat, 'chat', {
    id_user: IdUser,
    message
  })
}
