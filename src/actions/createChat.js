import supabase from '@/libs/supabase/server'

export async function createChat (message, IdUser1, IdUser2, Username1, Username2) {
  // Create JSON to upload
  const newChat = {
    id_user1: IdUser1,
    id_user2: IdUser2,
    content: [{ id_user: IdUser1, message }],
    username_1: Username1,
    username_2: Username2,
    read_user_1: true,
    read_user_2: false,
    last_message: new Date().toISOString().split('.')[0]
  }
  const { data, error } = await supabase.from('chats').insert(newChat).select().single()

  if (error) return { error: error.message }
  return data.id_chat
}
