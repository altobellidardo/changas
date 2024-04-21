import { NextRequest, NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'
import { getLocation } from '@/actions/getLocation'

export async function GET (req) {
  const request = new NextRequest(req)
  const query = request.nextUrl.searchParams

  const category = query.get('category')
  let name = query.get('name')
  const country = query.get('country')
  const province = query.get('province')
  const city = query.get('city')
  let hourlyPrice = query.get('hourly_price')
  let employees = query.get('employees')
  let score = query.get('score')

  // If a var is undefined we just assign an acceptable value
  if (score === 'undefined') {
    score = 0
  }
  if (name === 'undefined') {
    name = ''
  }
  if (hourlyPrice === 'undefined') {
    hourlyPrice = 200000000
  }
  if (employees === 'undefined') {
    employees = 0
  }

  // Get the location with the corresponding server function
  const data = (await (await getLocation(city, province, country, false)).json())

  let workers, error
  if (data.lat & data.lng) {
    const fetch = await supabase
      .rpc('get_workers_in_radius', {
        lat: data.lat,
        lng: data.lng,
        radius: 40000.0, // This will change
        cat: category
      })
      .lt('hourly_price', hourlyPrice)
      .gt('score', score)
      .order('score', { ascending: false })
    workers = fetch.data
    error = fetch.error
  } else {
    const fetch = await supabase.from('workers').select()
      .eq('category', category)
      .lt('hourly_price', hourlyPrice)
      .gt('score', score)
      .order('score', { ascending: false })
    workers = fetch.data
    error = fetch.error
  }

  if (error) {
    return NextResponse.json(
      { error: messages.error.failed_worker_fetch },
      { status: 400 }
    )
  }

  return NextResponse.json({ workers }, { status: 200 })
}
