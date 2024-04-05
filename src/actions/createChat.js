import supabase from '@/libs/supabase/server'

export async function createChat (message, IdUser1, IdUser2) {
  // Create JSON to upload
  const newChat = { id_user1: IdUser1, id_user2: IdUser2, content: [{ id_user: IdUser1, message }] }
  const { data, error } = await supabase.from('chats').insert(newChat).select().single()

  if (error) return { error: error.message }
  return data.id_chat
}
