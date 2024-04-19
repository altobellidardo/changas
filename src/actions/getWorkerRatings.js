import supabase from '@/libs/supabase/server'

export async function getWorkerRatings (IdUser, category) {
  const { data: ratings } = await supabase.from('reviews').select('score, date, description')
    .eq('id_reviewed_user', IdUser).eq('category', category)
  return ratings
}
