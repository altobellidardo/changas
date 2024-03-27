import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
// import checkCredentials from '@/utils/checkCredentials'
import supabase from '@/libs/supabase/server'

export async function POST (request) {
  const body = await request.json()
  const { category, IdUser, hourlyPrice, employees, username, description } = body
  const newWorker = { category, id_user: IdUser, hourly_price: hourlyPrice, employees, username, description }

  // Publish proposal
  const { error } = await supabase.from('proposals').insert(newWorker).select().single()
  if (error) {
    return NextResponse.json({ error: messages.error.error })
  }

  const response = NextResponse.json({ message: messages.success.user_created }, { status: 200 })

  return response
}
