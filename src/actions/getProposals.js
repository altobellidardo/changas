'use server'

import supabase from '@/libs/supabase/server'

export async function getProposals (Category) {
  const { data } = await supabase.from('proposals').select().eq('category', Category)

  console.log(data)

  return data
}
