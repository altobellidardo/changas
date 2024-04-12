import axios from 'axios'
import { NextResponse } from 'next/server'
import messages from '@/utils/messages'

export async function POST (req) {
  const { city, province, country, complete } = await req.json()
  const location = city + ', ' + province + ', ' + country
  const options = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
    params: {
      address: location,
      language: 'sp'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
  }

  try {
    const response = await axios.request(options)
    const fetchCity = response.data.results[0].locality
    const fetchProvince = response.data.results[0].region
    const fetchCountry = response.data.results[0].country
    // If the location was supposed to be complete and isn't an error is raised

    if (complete & (fetchCity === undefined || fetchCountry === undefined || fetchProvince === undefined)) {
      return NextResponse.json({ message: messages.error.location_not_found }, { status: 404 })
    }
    return NextResponse.json({
      message: messages.success.location_found,
      city: fetchCity,
      province: fetchProvince,
      country: fetchCountry
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: messages.error.location_not_found }, { status: 404 })
  }
}
