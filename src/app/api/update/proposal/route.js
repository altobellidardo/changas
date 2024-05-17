import { NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'
import { getLocation } from '@/actions/getLocation'

export async function PATCH (req) {
  const { IdProposal, budget, country, province, city, description } = await req.json()

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
  const { error } = await supabase.from('proposals')
    .update({
      budget,
      description,
      location,
      coordinates: `POINT(${lat} ${lng})`
    })
    .eq('id_proposal', IdProposal)

  if (error) { return NextResponse.json({ error: messages.error.failed_proposal_update }, { status: 404 }) }

  return NextResponse.json({ status: 200 })
}
