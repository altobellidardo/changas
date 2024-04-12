import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
import supabase from '@/libs/supabase/server'

export async function POST (request) {
  const body = await request.json()
  const { category, IdUser, budget, location, description } = body
  const newProposal = { category, id_user: IdUser, budget, location, description }

  // Publish proposal
  const { error } = await supabase.from('proposals').insert(newProposal)
  if (error) {
    return NextResponse.json({ error: messages.error.error })
  }

  const response = NextResponse.json({ message: messages.success.proposal_uploaded }, { status: 200 })

  return response
}
