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

  const response = NextResponse.json({ message: messages.success.review_uploaded }, { status: 200 })

  return response
}
