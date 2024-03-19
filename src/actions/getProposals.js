'use server'

import supabase from '@/utils/supabase/server'

export async function getProposals (IdCategory) {
  const { data } = await supabase.from('proposals').select().in('id_category', [IdCategory])

  console.log(data)

  return data
}
