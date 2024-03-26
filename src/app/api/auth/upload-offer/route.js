import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
// import checkCredentials from '@/utils/checkCredentials'
import supabase from '@/libs/supabase/server'

export async function POST (request) {
  const body = await request.json()
  const { category, IdUser, budget, location, description } = body
  const newProposal = { category, IdUser, budget, location, description }
  console.log(newProposal)
  // Publish proposal
  const { data: newProposalPublished, error } = await supabase.from('proposals').insert(newProposal).select().single()
  if (error) {
    return NextResponse.json({ error: messages.error.error })
  }
  console.log(newProposalPublished)
  const response = NextResponse.json({ message: messages.success.user_created }, { status: 200 })

  return response
}
