'use server'

import supabase from '@/utils/supabase/server'

export async function getWorkers (IdCategory) {
  const { data } = await supabase.from('workers').select().in('id_category', [IdCategory])

  console.log(data)

  return data
}
