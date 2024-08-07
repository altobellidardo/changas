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
  const data = formData.get('data')
  const { idChat, user1 } = JSON.parse(data)

  if (msg === '') return

  await supabase
    .from('messages')
    .insert({ id_chat: idChat, content: msg, user_1: user1 })
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

export async function getFullChat (IdChat) {
  const { data: chat } = await supabase
    .from('messages')
    .select('content, user_1, time')
    .eq('id_chat', IdChat)
    .order('time', { ascending: true })
  return chat
}
