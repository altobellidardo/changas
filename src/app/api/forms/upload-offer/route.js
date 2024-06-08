import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
import supabase from '@/libs/supabase/server'

export async function POST (request) {
  const body = await request.json()
  const { category, IdUser, username, budget, location, lat, lng, description } = body
  const newProposal = {
    category,
    id_user: IdUser,
    username,
    budget,
    location,
    coordinates: `POINT(${lat} ${lng})`,
    description
  }

  // Publish proposal
  const { error } = await supabase.from('proposals').insert(newProposal)
  console.log(error)
  if (error) {
    return NextResponse.json({ error: messages.error.error })
  }

  const response = NextResponse.json({ message: messages.success.proposal_uploaded }, { status: 200 })

  return response
}
