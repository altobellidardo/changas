import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
import supabase from '@/libs/supabase/server'

export async function POST (request) {
  const body = await request.json()
  const { category, IdUser, hourlyPrice, attentionHours, location, lat, lng, employees, username, description } = body
  const newWorker = {
    category,
    id_user: IdUser,
    hourly_price: hourlyPrice,
    attention_hours: attentionHours,
    location,
    coordinates: `POINT(${lat} ${lng})`,
    employees,
    username,
    description
  }

  // Check if worker has already uploaded the job
  const { count, error: fail } = await supabase.from('workers').select('*', { count: 'exact', head: true }).eq('id_user', IdUser).eq('category', category)
  if (fail) {
    return NextResponse.json({ error: messages.error.error })
  }
  if (count === 1) {
    return NextResponse.json({ error: messages.error.existing_job })
  }

  const { error } = await supabase.from('workers').insert(newWorker)
  if (error) {
    return NextResponse.json({ error: messages.error.error })
  }

  const response = NextResponse.json({ message: messages.success.job_uploaded }, { status: 200 })

  return response
}
