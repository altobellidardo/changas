import { getWorkers } from '@/actions/getWorkers'
import { NextResponse } from 'next/server'

export async function POST (req) {
  // const { category, filter } = await req.json()
  const { category } = await req.json()

  // const { data: workers, error } = await getWorkers(category, filter)
  const workers = await getWorkers(category)

  return NextResponse.json({ workers })
}
