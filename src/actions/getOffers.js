'use server'

import supabase from '@/utils/supabase/server'

export async function getOffers (IdUser) {
  const { data: user } = await supabase.from('proposals').select().eq('id_user', IdUser)

  console.log(user)

  return user
}