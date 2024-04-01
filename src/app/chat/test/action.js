'use server'

import supabase from '@/libs/supabase/server'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { getMessages } from '@/actions/getMessages'

export async function postData ({ formData }) {
  const Pusher = require('pusher')

  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  // Retrieve data from JWT
  const { id_user: IdUser } = isAuthenticated

  const history = await getMessages()
  console.log(formData)
  const message = formData.get('message')
  const newData = [...history, { id_user: IdUser, message }]

  const { data: response } = await supabase.from('chats').update({ message: newData }).select().eq('id_chat', '1').single()
  console.log(response)
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'sa1',
    useTLS: true
  })

  await pusher.trigger('chat', 'hello', {
    message: `${JSON.stringify(message)}\n\n`
  })
}
