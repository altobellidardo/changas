'use server'

import supabase from '@/libs/supabase/server'

export async function getWorkers (Category) {
  const { data } = await supabase.from('workers').select().eq('category', Category)

  console.log(data)

  return data
}
