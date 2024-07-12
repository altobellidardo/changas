'use server'

import supabase from '@/libs/supabase/server'

export async function getMessages () {
  const { data: messages } = await supabase
    .from('chat-test')
    .select('*')
    .order('id', { ascending: false })

  return messages
}

export async function sendMessage (formData) {
  const msg = formData.get('msg')

  await supabase
    .from('chat-test')
    .insert({ msg, from: true })
}

export async function getChat (idChat) {
  const { data: chat } = await supabase
    .from('chats')
    .select('content, id_user1, id_user2, username_1, username_2')
    .eq('id_chat', idChat)
    .single()
  return chat
}

export async function seeChat (IdChat, UserNumber) {
  const updateObj = { [`read_user_${UserNumber}`]: true }
  await supabase.from('chats').update(updateObj).eq('id_chat', IdChat)
}
