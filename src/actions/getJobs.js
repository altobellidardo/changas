import supabase from '@/libs/supabase/server'

export async function getJobs (IdUser) {
  const { data: user } = await supabase.from('workers').select().eq('id_user', IdUser)

  return user
}
