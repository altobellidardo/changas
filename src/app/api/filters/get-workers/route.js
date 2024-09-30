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
  let minhourlyPrice = query.get('min_hourly_price')
  let maxhourlyPrice = query.get('max_hourly_price')
  let distance = query.get('distance') * 1000
  let employees = query.get('employees')
  let maxScore = query.get('max_score')
  let minScore = query.get('min_score')
  let order = query.get('order')
  const onlyCertified = query.get('only_certified')

  // We set an upper and lower bound of the results to be shown
  const lowerBound = RESULTS_PER_PAGE * page
  const upperBound = lowerBound + RESULTS_PER_PAGE - 1

  // If a var is undefined we just assign an acceptable value
  if (minScore === 'undefined' || minScore === '' || minScore === null) {
    minScore = 0
  }
  if (maxScore === 'undefined' || maxScore === '' || maxScore === null) {
    maxScore = 5
  }
  if (name === 'undefined' || name === null) {
    name = ''
  }
  if (minhourlyPrice === 'undefined' || minhourlyPrice === '' || minhourlyPrice === null) {
    minhourlyPrice = 0
  }
  if (maxhourlyPrice === 'undefined' || maxhourlyPrice === '' || maxhourlyPrice === null) {
    maxhourlyPrice = 200000000
  }
  if (employees === 'undefined' || employees === '' || employees === null) {
    employees = 0
  }
  if (isNaN(distance) || distance === 0) {
    distance = 40000
  }
  if (order === 'undefined' || order === '' || order === null) {
    order = 'score'
  }

  // Get the location with the corresponding server function
  const data = (await (await getLocation(city, province, country, false)).json())

  const columns = 'id_user, id_worker, hourly_price, location, score, employees, description, attention_hours, new, certified, users_data!inner(status, username)'
  const baseQuery = (lat, lng) => {
    return lat && lng
      ? supabase.rpc('get_workers_in_radius',
        {
          lat,
          lng,
          radius: distance,
          cat: category,
          minhourlyprice: minhourlyPrice,
          maxhourlyprice: maxhourlyPrice,
          minscore: minScore,
          maxscore: maxScore,
          minemployees: employees,
          workername: name
        })
      : supabase.from('workers').select(columns)
        .eq('category', category)
        .gte('hourly_price', minhourlyPrice)
        .lte('hourly_price', maxhourlyPrice)
        .gte('score', minScore).lte('score', maxScore)
        .gt('employees', employees)
        .ilike('users_data.username', `%${name}%`)
  }

  const applyFilters = (query, onlyCertified) => {
    if (onlyCertified && onlyCertified === 'Yes') {
      return query
        .eq('certified', true) // Apply certified filter
        .order(order, { ascending: (order !== 'score') })
        .range(lowerBound, upperBound)
    } else {
      return query
        .order(order, { ascending: (order !== 'score') })
        .range(lowerBound, upperBound)
    }
  }

  const initialQuery = baseQuery(data.lat, data.lng)
  const certifiedQuery = applyFilters(initialQuery, onlyCertified) // Apply common filters
  const fetch = await certifiedQuery

  const workers = fetch.data
  const error = fetch.error

  // console.log(workers)

  if (error) {
    console.log(error)
    return NextResponse.json(
      { error: messages.error.failed_worker_fetch },
      { status: 400 }
    )
  }

  return NextResponse.json({ workers }, { status: 200 })
}
