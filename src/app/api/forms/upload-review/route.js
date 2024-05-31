import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
import supabase from '@/libs/supabase/server'

export async function POST (request) {
  const { id_contract: IdContract, id_reviewer_user: ReviewerId, id_reviewed_user: ReviewedId, category: Category, description, score } = await request.json()
  const newReview = { id_contract: IdContract, id_reviewer_user: ReviewerId, id_reviewed_user: ReviewedId, category: Category, description, score }

  // Check if review already exists
  const { count } = await supabase.from('reviews').select('id_review', { count: 'exact' }).eq('id_contract', IdContract)
  if (count) { return NextResponse.json({ error: messages.error.existing_review }) }

  // Publish review
  const { error } = await supabase.from('reviews').insert(newReview)
  if (error) {
    return NextResponse.json({ error: messages.error.error })
  }

  // Update worker reviews
  const { data: userRating } = await supabase.from('workers').select('n_reviews, score').eq('id_user', ReviewedId).single()
  console.log(userRating)
  // Define variables that will update the workers table
  let { n_reviews: nReviews, score: userScore } = userRating
  nReviews += 1
  userScore = (((userScore * (nReviews - 1)) + parseInt(score)) / nReviews).toFixed(1)

  const { error: ratingError } = await supabase.from('workers').update({ n_reviews: nReviews, score: userScore }).eq('id_user', ReviewedId)

  if (ratingError) {
    console.log(ratingError)
    return NextResponse.json({ error: messages.error.error })
  }

  const response = NextResponse.json({ message: messages.success.proposal_uploaded }, { status: 200 })

  return response
}
