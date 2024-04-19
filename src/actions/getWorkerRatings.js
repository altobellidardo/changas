import supabase from '@/libs/supabase/server'

export async function getWorkerRatings (IdUser, category) {
  const { data: ratings } = await supabase.from('reviews').select('category, score, date, description')
    .eq(`and(id_reviewed_user.eq.${IdUser}, category.eq.${category})`)

  return ratings
}
