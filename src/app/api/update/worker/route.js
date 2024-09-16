import { NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import { decode } from 'base64-arraybuffer'
import messages from '@/utils/messages'
import { getLocation } from '@/actions/getLocation'

export async function PATCH (req) {
  const {
    IdWorker,
    hourly_price: hourlyPrice,
    employees,
    attention_hours: attentionHours,
    description,
    country,
    province,
    city,
    certification,
    delete_certification: deleteCertification
  } = await req.json()

  const response = await getLocation(city, province, country, true)
  const data = await response.json()
  const location = data.city + ', ' + data.province + ', ' + data.country
  const lat = data.lat
  const lng = data.lng
  const message = data.message
  const status = response.status

  if (status !== 200) {
    console.log(status)
    return NextResponse.json({ error: message }, { status })
  }
  // Update the user's data given the req's body
  const { error } = await supabase.from('workers')
    .update({
      hourly_price: hourlyPrice,
      employees,
      attention_hours: attentionHours,
      description,
      location,
      coordinates: `POINT(${lat} ${lng})`,
      certified: !deleteCertification
    })
    .eq('id_worker', IdWorker)

  if (error) { return NextResponse.json({ error: messages.error.failed_worker_update }, { status: 404 }) }

  if (deleteCertification) {
    const { error: certificateFail } = await supabase.storage.from('certifications').remove([`${IdWorker}.pdf`])
    if (certificateFail) return NextResponse.json({ error: messages.error.certification_delete_failed })
  } else if (certification) {
    const { error: certificateFail } = await supabase.storage.from('certifications').upload(`${IdWorker}.pdf`, decode(certification), {
      upsert: true, contentType: 'application/pdf' // The Expo app sends all CERTIFICATES as PDF
    })
    if (certificateFail) return NextResponse.json({ error: messages.error.certification_upload_failed })
  }

  return NextResponse.json({ status: 200 })
}
