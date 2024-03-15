'use server'

import supabase from '@/utils/supabase/server'

export async function getCategories () {
  const { data } = await supabase.from('categories').select('*')

  console.log(data)

  return data
}
