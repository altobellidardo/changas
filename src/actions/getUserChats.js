'use server'
import supabase from '@/libs/supabase/server'

export async function getUserChats (IdUser) {
  const { data: chats } = await supabase.from('chats').select('id_chat, id_user1, id_user2').or(
    `id_user1.eq.${IdUser}, id_user2.eq.${IdUser}`)
  return chats
}
