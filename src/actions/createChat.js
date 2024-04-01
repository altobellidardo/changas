'use server'
import supabase from '@/libs/supabase/server'

export async function createChat (formData, IdUser1, IdUser2) {
  // Retrieve data from formData
  const message = formData.get('message')
  const newChat = { id_user1: IdUser1, id_user2: IdUser2, content: [{ id_user: 'id_user1', message }] }
  const { data, error } = await supabase.from('chats').insert(newChat).select().single()

  if (error) return { error: error.message }
  return data.id_chat
}
