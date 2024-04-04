import supabase from '@/libs/supabase/server'

export async function getRatings (IdUser, jobs) {
  const jobsNames = jobs.map((item) => (
    item.category
  ))
  console.log(jobsNames)
  const { data: user } = await supabase.from('reviews').select('').eq('id_user', IdUser)

  return user
}
