'use server'

import supabase from '@/libs/supabase/server'

export async function getExistingChat (idUser1, idUser2) {
  const { data } = await supabase
    .from('chats')
    .select('id_chat')
    .or(`and(id_user1.eq.${idUser1}, id_user2.eq.${idUser2}), and(id_user2.eq.${idUser1}, id_user1.eq.${idUser2})`)
  const idChat = [data.id_chat]

  return { IdChat: idChat, count: data.length }
}

export async function getChat (idChat) {
  const { data: chat } = await supabase
    .from('chats')
    .select('id_user1, id_user2, username_1, username_2')
    .eq('id_chat', idChat)
    .single()
  return chat
}

export async function sendMessage (formData) {
  const msg = formData.get('msg')
  const data = formData.get('data')
  const { idChat, user1 } = JSON.parse(data)

  if (msg === '') return false

  const { error } = await supabase
    .from('messages')
    .insert({ id_chat: idChat, content: msg, user_1: user1 })

  if (error) return false
  return true
}

export async function createChat (formData) {
  const infoData = formData.get('data')
  const message = formData.get('message')
  const info = JSON.parse(infoData)

  const newChat = {
    id_user1: info.user1.id,
    id_user2: info.user2.id,
    username_1: info.user1.username,
    username_2: info.user2.username,
    read_user_1: true,
    read_user_2: false,
    last_message: new Date().toISOString().split('.')[0]
  }

  const { data, error } = await supabase
    .from('chats')
    .insert(newChat)
    .select()
    .single()
  if (error) return { error: error.message }

  const sendData = new FormData()
  sendData.append('msg', message)
  sendData.append('data', JSON.stringify({ idChat: data.id_chat, user1: true }))

  await sendMessage(sendData)

  return { idChat: data.id_chat }
}

export async function seeChat (IdChat, UserNumber) {
  const updateObj = { [`read_user_${UserNumber}`]: true }
  await supabase.from('chats').update(updateObj).eq('id_chat', IdChat)
}

export async function getFullChat (IdChat) {
  // deprecated
  const { data: chat } = await supabase
    .from('messages')
    .select('content, user_1, time')
    .eq('id_chat', IdChat)
    .order('time', { ascending: true })
  return chat
}
