import supabase from '@/libs/supabase/server'

export async function getOffers (IdUser) {
  const { data: user } = await supabase.from('proposals').select().eq('id_user', IdUser)

  return user
}
