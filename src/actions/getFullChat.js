'use server'
import supabase from '@/libs/supabase/server'

export async function getFullChat (IdChat) {
  const { data: chat } = await supabase.from('chats').select('content, id_user1, id_user2').eq('id_chat', IdChat).single()
  return chat
}
