import supabase from '@/libs/supabase/server'

export async function getMessages (IdChat) {
  const { data: chat } = await supabase.from('chats').select('content').eq('id_chat', IdChat).single()
  return chat
}
