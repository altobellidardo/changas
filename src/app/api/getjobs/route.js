import { NextRequest, NextResponse } from 'next/server'
import messages from '@/utils/messages'
import supabase from '@/libs/supabase/server'

export async function GET (req) {
  const request = new NextRequest(req)
  const query = request.nextUrl.searchParams

  const IdUser = query.get('id_user')

  const { data: categories, error } = await supabase.from('workers').select('category').eq('id_user', IdUser)
  if (error) {
    return NextResponse.json(
      { error: messages.error.user_jobs_not_found },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { categories }, { status: 200 }
  )
}
