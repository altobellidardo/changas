import supabase from '@/libs/supabase/server'

export async function getUser (IdUser) {
  const { data: user } = await supabase.from('users_data').select().eq('id_user', IdUser).single()

  return user
}
