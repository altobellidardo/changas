import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'
import { NextResponse } from 'next/server'

export async function POST (req) {
  const { idUser, status } = await req.json()

  const { error } = supabase
    .from('users_data')
    .update({ status })
    .eq('id_user', idUser)

  if (error) {
    return NextResponse.json({ error: messages.error.failed_user_update }, { status: 404 })
  }
}
