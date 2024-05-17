import { NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'

export async function PATCH (req) {
  const { IdWorker, hourly_price: hourlyPrice, employees, attention_hours: attentionHours, description } = await req.json()

  // Update the user's data given the req's body
  const { error } = await supabase.from('workers')
    .update({ hourly_price: hourlyPrice, employees, attention_hours: attentionHours, description })
    .eq('id_worker', IdWorker)

  if (error) { return NextResponse.json({ error: messages.error.failed_worker_update }, { status: 404 }) }

  return NextResponse.json({ status: 200 })
}
