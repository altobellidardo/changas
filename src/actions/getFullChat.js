import supabase from '@/libs/supabase/server'

export async function getFullChat (IdChat) {
  const { data: chat } = await supabase.from('chats').select('content, id_user1, id_user2, username_1, username_2').eq('id_chat', IdChat).single()
  return chat
}
