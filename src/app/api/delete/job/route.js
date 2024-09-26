import { NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'

export async function DELETE (req) {
  const { IdUser, IdWorker } = await req.json()

  // Check if user corresponds to the Id
  const { error: checkError, count } = await supabase.from('workers')
    .select('*', { count: 'exact' }).eq('id_worker', IdWorker).eq('id_user', IdUser)

  if (count === 1) {
    // Delete the user's data
    const { error, data } = await supabase.from('workers')
      .delete()
      .eq('id_worker', IdWorker)
      .select('certified')

    // Remove the certifications in case the worker uploaded any
    if (data[0].certified) await supabase.storage.from('certifications').remove([`${IdWorker}.pdf`])

    if (error) { return NextResponse.json({ error: messages.error.failed_worker_delete }, { status: 404 }) }
  } else if (count !== 1 || checkError) {
    return NextResponse.json({ error: messages.error.failed_worker_delete }, { status: 403 })
  }

  return NextResponse.json({ status: 200 })
}
