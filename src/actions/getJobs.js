'use server'

import supabase from '@/utils/supabase/server'

export async function getJobs (IdUser) {
  const { data: user } = await supabase.from('workers').select().eq('id_user', IdUser)

  console.log(user)

  return user
}
