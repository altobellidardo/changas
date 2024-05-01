import supabase from '@/libs/supabase/server'

export async function getProposals (Category, page) {
  // This constant limits the number of results per page
  const RESULTS_PER_PAGE = 24

  // We set an upper and lower bound of the results to be shown
  const lowerBound = RESULTS_PER_PAGE * page
  const upperBound = lowerBound + RESULTS_PER_PAGE - 1

  const { data } = await supabase.from('proposals').select().eq('category', Category).range(lowerBound, upperBound)

  return data
}
