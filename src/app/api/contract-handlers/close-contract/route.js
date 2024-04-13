import { NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'

export async function PATCH (req) {
  const { IdContract, IdUser, IdWorker, IdContractor, workerTurn } = await req.json()

  // Evaluate whether is user's turn and then update the registry
  if ((workerTurn && IdWorker === IdUser) || (!workerTurn && IdContractor === IdUser)) {
    const { error } = await supabase.from('contracts')
      .update({ closed: true })
      .eq('id_contract', IdContract)
    if (error) { return NextResponse.json({ error: messages.error.failed_close_contract }, { status: 404 }) }
  } else {
    return NextResponse.json({ error: messages.error.not_user_turn }, { status: 401 })
  }

  return NextResponse.json({ status: 200 })
}
