'use server'
import supabase from '@/libs/supabase/server'

export async function getMessages () {
  const { data: chat } = await supabase.from('chats').select('content').eq('id_chat', '1').single()
  // console.log(chat)
  return chat
}
