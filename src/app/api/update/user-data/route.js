import { NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'

export async function PATCH (req) {
  const { IdUser, phone } = await req.json()

  // Update the user's data given the req's body
  const { error } = await supabase.from('users_data').update({ phone }).eq('id_user', IdUser)

  if (error) { return NextResponse.json({ error: messages.error.failed_user_update }, { status: 404 }) }

  return NextResponse.json({ status: 200 })
}
