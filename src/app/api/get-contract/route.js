import { NextRequest, NextResponse } from 'next/server'
import messages from '@/utils/messages'
import supabase from '@/libs/supabase/server'

export async function GET (req) {
  const request = new NextRequest(req)
  const query = request.nextUrl.searchParams

  const IdContract = query.get('id_contract')

  const { data: contract, error } = await supabase.from('contracts').select().eq('id_contract', IdContract).single()
  if (error) {
    return NextResponse.json(
      { error: messages.error.contract_not_found },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { contract }, { status: 200 }
  )
}
