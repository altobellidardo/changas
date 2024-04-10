import supabase from '@/libs/supabase/server'

export async function getWorkers (Category) {
  const { data } = await supabase.from('workers').select().eq('category', Category).order('score', { ascending: false })

  return data
}
