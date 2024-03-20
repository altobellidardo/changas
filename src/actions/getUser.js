'use server'

import supabase from '@/utils/supabase/server'

export async function getUser (IdUser) {
  const { data: user } = await supabase.from('users_real').select().eq('id_user', IdUser)

  console.log(user)

  return user[0]
}
