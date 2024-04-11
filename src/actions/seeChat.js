import supabase from '@/libs/supabase/server'

export async function seeChat (IdChat, UserNumber) {
  const updateObject = {}
  updateObject[`read_user_${UserNumber}`] = true
  await supabase.from('chats').update(updateObject).eq('id_chat', IdChat)
}
