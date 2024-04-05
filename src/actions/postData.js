import supabase from '@/libs/supabase/server'
import { getMessages } from '@/actions/getMessages'
import Pusher from 'pusher'

export async function postData (formData, IdUser, IdChat) {
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

  await pusher.trigger(`presence-${IdChat}`, 'chat', {
    id_user: IdUser,
    message
  })
}
