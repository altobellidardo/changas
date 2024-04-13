import { NextResponse } from 'next/server'
import supabase from '@/libs/supabase/server'
import messages from '@/utils/messages'

export async function POST (req) {
  const {
    userType,
    IdUser,
    OtherUser,
    category,
    jobtitle,
    date,
    budget,
    description,
    payformat
  } = await req.json()

  // Create JSON to upload
  const newContract = {
    id_worker: userType === 'worker' ? IdUser : OtherUser,
    id_contractor: userType === 'worker' ? OtherUser : IdUser,
    title: jobtitle,
    date,
    budget,
    description,
    category,
    changas_pay: payformat === 'changas',
    closed: false,
    worker_turn: userType !== 'worker'
  }
  const { count } = await supabase.from('contracts').select('*', { count: 'exact', head: true })
    .or(`and(id_worker.eq.${IdUser}, id_contractor.eq.${OtherUser}), and(id_worker.eq.${OtherUser}, id_contractor.eq.${IdUser})`)
    .eq('closed', false)
  console.log(count)
  if (count) { return NextResponse.json({ error: messages.error.pending_contract }, { status: 401 }) }
  const { error } = await supabase.from('contracts').insert(newContract).select().single()
  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  return NextResponse.json({ status: 200 })
}
