import { NextResponse } from 'next/server'
import messages from '@/utils/messages'
import { decode } from 'base64-arraybuffer'
import supabase from '@/libs/supabase/server'

export async function POST (request) {
  const body = await request.json()
  const { category, IdUser, hourlyPrice, attentionHours, location, lat, lng, employees, description, certification } = body
  const newWorker = {
    category,
    id_user: IdUser,
    hourly_price: hourlyPrice,
    attention_hours: attentionHours,
    location,
    coordinates: `POINT(${lat} ${lng})`,
    employees,
    description,
    certified: certification !== null
  }

  // Check if worker has already uploaded the job
  const { count, error: fail } = await supabase.from('workers').select('*', { count: 'exact', head: true }).eq('id_user', IdUser).eq('category', category)
  if (fail) {
    return NextResponse.json({ error: messages.error.error })
  }
  if (count === 1) {
    return NextResponse.json({ error: messages.error.existing_job })
  }

  const { error, data } = await supabase.from('workers').insert(newWorker).select('id_worker').single()
  if (error) {
    return NextResponse.json({ error: messages.error.error })
  }

  if (newWorker.certified) {
    const { error: certificationFail } = await supabase.storage.from('certifications').upload(`${data.id_worker.toString()}.pdf`, // The worker ID is an INT
      decode(certification),
      {
        upsert: true, contentType: 'application/pdf' // The Expo app sends only PDFs as certifications
      })
    if (certificationFail) {
      return NextResponse.json({ error: messages.error.certification_upload_failed })
    }
  }

  const response = NextResponse.json({ message: messages.success.job_uploaded }, { status: 200 })

  return response
}
