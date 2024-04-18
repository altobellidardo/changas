import { NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'

export async function DELETE (req) {
  const searchParams = req.nextUrl.searchParams
  const workerTurn = searchParams.get('workerTurn')
  const IdUser = searchParams.get('IdUser')
  const IdWorker = searchParams.get('IdWorker')
  const IdContractor = searchParams.get('IdContractor')
  const IdContract = searchParams.get('IdContract')

  // Evaluate whether is user's turn and then delete the registry
  if ((workerTurn && IdWorker === IdUser) || (!workerTurn && IdContractor === IdUser)) {
    const { error } = await supabase.from('contracts')
      .delete()
      .eq('id_contract', IdContract)
    if (error) { return NextResponse.json({ error: messages.error.failed_close_contract }, { status: 404 }) }
  } else {
    return NextResponse.json({ error: messages.error.not_user_turn }, { status: 401 })
  }

  return NextResponse.json({ status: 200 })
}
