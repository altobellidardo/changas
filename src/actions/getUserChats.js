import supabase from '@/libs/supabase/server'

export async function getUserChats (IdUser) {
  const columns = 'id_chat, id_user1, id_user2, username_1, username_2, read_user_1, read_user_2'
  const { data: chats } = await supabase.from('chats').select(columns)
    .or(`id_user1.eq.${IdUser}, id_user2.eq.${IdUser}`)
  return chats
}
