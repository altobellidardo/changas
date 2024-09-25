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
  let minBudget = query.get('min_budget')
  let maxBudget = query.get('max_budget')
  let openDate = query.get('openDate')
  let name = query.get('name')
  let order = query.get('order')

  // We set an upper and lower bound of the results to be shown
  const lowerBound = RESULTS_PER_PAGE * page
  const upperBound = lowerBound + RESULTS_PER_PAGE - 1

  // If a var is undefined we just assign an acceptable value
  if (minBudget === 'undefined' || minBudget === '') {
    minBudget = 0
  }
  if (maxBudget === 'undefined' || maxBudget === '') {
    maxBudget = 200000000
  }
  if (openDate === 'undefined') {
    openDate = '01-01-2000'
  }
  if (isNaN(distance) || distance === 0) {
    distance = 40000
  }
  if (name === 'undefined') {
    name = ''
  }
  if (order === 'undefined' || order === '') {
    order = 'open_date'
  }

  // Get the location with the corresponding server function
  const data = (await (await getLocation(city, province, country, false)).json())

  const columns = 'id_user, budget, location, open_date, description, username, users_data!inner(status, username)'

  const baseQuery = (lat, lng) => {
    return lat && lng
      ? supabase.rpc('get_proposals_in_radius',
        {
          lat,
          lng,
          radius: distance,
          cat: category,
          minbudget: minBudget,
          maxbudget: maxBudget,
          opendate: openDate,
          proposalname: name
        })
      : supabase.from('proposals').select(columns)
        .eq('category', category)
        .gte('budget', minBudget)
        .lte('budget', maxBudget)
        .gt('open_date', openDate)
        .ilike('users_data.username', `%${name}%`)
  }

  const applyFilters = (query) => {
    return query
      .order(order, { ascending: false })
      .range(lowerBound, upperBound)
  }

  const initialQuery = baseQuery(data.lat, data.lng)
  const finalQuery = applyFilters(initialQuery) // Apply common filters
  const fetch = await finalQuery

  const proposals = fetch.data
  const error = fetch.error

  if (error) {
    return NextResponse.json(
      { error: messages.error.failed_proposal_fetch },
      { status: 400 }
    )
  }

  return NextResponse.json({ proposals }, { status: 200 })
}
