import { NextResponse } from 'next/server'
// import messages from '@/utils/messages'
import supabase from '@/libs/supabase/server'

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
    closed: false
  }
  const { error } = await supabase.from('contracts').insert(newContract).select().single()
  console.log('Se logro sin', error)
  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  return NextResponse.json({ status: 200 })
}
