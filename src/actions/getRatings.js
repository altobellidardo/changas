import supabase from '@/libs/supabase/server'

export async function getRatings (IdUser, jobs) {
  if (jobs === null) return null
  const jobsNames = jobs.map((item) => (
    item.category
  ))
  const { data: ratings } = await supabase.from('reviews').select('category, score', { count: 'exact', head: false })
    .eq('id_reviewed_user', IdUser).in('category', jobsNames)

  // Create an object to hold the total score and count for each category
  const R = 2.4
  const W = 5
  const categoryData = {}
  ratings.forEach(rating => {
    if (!categoryData[rating.category]) {
      categoryData[rating.category] = { total: (R * W), count: W }
    }
    categoryData[rating.category].total += rating.score
    categoryData[rating.category].count++
  })

  // Calculate the average score for each category based on Bayesian probability (https://stackoverflow.com/questions/2495509/how-to-balance-number-of-ratings-versus-the-ratings-themselves)
  const averageRatings = {}
  for (const category in categoryData) {
    averageRatings[category] = (categoryData[category].total / categoryData[category].count).toFixed(1)
  }

  return averageRatings
}
