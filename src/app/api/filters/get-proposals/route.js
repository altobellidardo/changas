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
  const country = query.get('country')
  const province = query.get('province')
  const city = query.get('city')
  let distance = query.get('distance') * 1000
  let budget = query.get('budget')
  let openDate = query.get('openDate')

  // We set an upper and lower bound of the results to be shown
  const lowerBound = RESULTS_PER_PAGE * page
  const upperBound = lowerBound + RESULTS_PER_PAGE - 1

  // If a var is undefined we just assign an acceptable value
  if (budget === 'undefined') {
    budget = 0
  }
  if (openDate === 'undefined') {
    openDate = '01-01-2000'
  }
  if (isNaN(distance)) {
    distance = 40000
  }

  // Get the location with the corresponding server function
  const data = (await (await getLocation(city, province, country, false)).json())

  let proposals, error
  if (data.lat & data.lng) {
    const fetch = await supabase
      .rpc('get_proposals_in_radius', {
        lat: data.lat,
        lng: data.lng,
        radius: distance,
        cat: category
      })
      .gt('budget', budget)
      .gt('open_date', openDate)
      .order('open_date', { ascending: false })
      .range(lowerBound, upperBound)
    proposals = fetch.data
    error = fetch.error
  } else {
    const columns = 'budget, location, open_date, description'
    const fetch = await supabase.from('proposals').select(columns)
      .eq('category', category)
      .gt('budget', budget)
      .gt('open_date', openDate)
      .order('open_date', { ascending: false })
      .range(lowerBound, upperBound)
    proposals = fetch.data
    error = fetch.error
  }
  if (error) {
    return NextResponse.json(
      { error: messages.error.failed_proposal_fetch },
      { status: 400 }
    )
  }

  return NextResponse.json({ proposals }, { status: 200 })
}
