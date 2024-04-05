import axios from 'axios'
import { NextResponse } from 'next/server'
import messages from '@/utils/messages'

export async function POST (req) {
  const { city, province, country } = await req.json()
  const location = city + ', ' + province + ', ' + country
  const options = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
    params: {
      address: location,
      language: 'sp'
    },
    headers: {
      'X-RapidAPI-Key': 'fc1569936dmsh70293b045ce5a18p15778ejsnd98211715ad4',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
  }

  try {
    const response = await axios.request(options)
    const fetchCity = response.data.results[0].locality
    const fetchProvince = response.data.results[0].region
    const fetchCountry = response.data.results[0].country
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
