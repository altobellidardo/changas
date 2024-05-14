import { NextRequest, NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'
import { getLocation } from '@/actions/getLocation'
import { RESULTS_PER_PAGE } from '@/constants'

export async function GET (req) {
  const request = new NextRequest(req)
  const query = request.nextUrl.searchParams

  const category = query.get('category')
  const page = query.get('page')
  let name = query.get('name')
  const country = query.get('country')
  const province = query.get('province')
  const city = query.get('city')
  let hourlyPrice = query.get('hourly_price')
  let distance = query.get('distance') * 1000
  let employees = query.get('employees')
  let score = query.get('score')

  // We set an upper and lower bound of the results to be shown
  const lowerBound = RESULTS_PER_PAGE * page
  const upperBound = lowerBound + RESULTS_PER_PAGE - 1

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
  if (distance === 'undefined') {
    distance = 40000
  }

  // Get the location with the corresponding server function
  const data = (await (await getLocation(city, province, country, false)).json())

  let workers, error
  if (data.lat & data.lng) {
    const fetch = await supabase
      .rpc('get_workers_in_radius', {
        lat: data.lat,
        lng: data.lng,
        radius: distance,
        cat: category
      })
      .lt('hourly_price', hourlyPrice)
      .gt('score', score)
      .gt('employees', employees)
      .ilike('username', `%${name}%`)
      .order('score', { ascending: false })
      .range(lowerBound, upperBound)
    workers = fetch.data
    error = fetch.error
  } else {
    const fetch = await supabase.from('workers').select()
      .eq('category', category)
      .lt('hourly_price', hourlyPrice)
      .gt('score', score)
      .gt('employees', employees)
      .ilike('username', `%${name}%`)
      .order('score', { ascending: false })
      .range(lowerBound, upperBound)
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
