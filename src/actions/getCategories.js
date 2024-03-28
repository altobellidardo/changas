import supabase from '@/libs/supabase/server'

export async function getCategories () {
  const { data } = await supabase.from('categories').select()

  return data
}
