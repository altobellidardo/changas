import { getLocation } from '@/actions/getLocation'

export async function POST (req) {
  const { city, province, country, complete } = await req.json()
  return await getLocation(city, province, country, complete)
}
