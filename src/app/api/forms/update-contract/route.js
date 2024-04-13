import { NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'

export async function PATCH (req) {
  const {
    IdContract,
    IdUser,
    IdWorker,
    IdContractor,
    jobtitle,
    date,
    budget,
    description,
    payformat,
    workerTurn
  } = await req.json()

  // Create JSON to upload
  const counterDeal = {
    title: jobtitle,
    date,
    budget,
    description,
    changas_pay: payformat === 'changas',
    closed: false,
    worker_turn: !workerTurn
  }

  // Evaluate whether is user's turn and then update the registry
  if ((workerTurn && IdWorker === IdUser) || (!workerTurn && IdContractor === IdUser)) {
    const { error } = await supabase.from('contracts')
      .update(counterDeal)
      .eq('id_contract', IdContract)
    if (error) { return NextResponse.json({ error: messages.error.counterdeal_error }, { status: 404 }) }
  } else {
    return NextResponse.json({ error: messages.error.not_user_turn }, { status: 401 })
  }

  return NextResponse.json({ status: 200 })
}
