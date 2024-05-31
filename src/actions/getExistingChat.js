import supabase from '@/libs/supabase/server'

export async function getExistingChat (IdUser1, idUser2) {
  const { data: IdChat, count } = await supabase.from('chats').select('id_chat', { count: 'exact' }).or(
    `and(id_user1.eq.${IdUser1}, id_user2.eq.${idUser2}), and(id_user2.eq.${IdUser1}, id_user1.eq.${idUser2})`).single()
  return { IdChat, count }
}
