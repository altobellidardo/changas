import supabase from '@/libs/supabase/server'
import { RESULTS_PER_PAGE } from '@/constants'

export async function getProposals (Category, page) {
  // We set an upper and lower bound of the results to be shown
  const lowerBound = RESULTS_PER_PAGE * page
  const upperBound = lowerBound + RESULTS_PER_PAGE - 1

  const { data } = await supabase.from('proposals').select().eq('category', Category).range(lowerBound, upperBound)

  return data
}
