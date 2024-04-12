import supabase from '@/libs/supabase/server'

export async function getContractsUsers (IdUser, OtherUser) {
  const { data: contracts } = await supabase.from('contracts').select()
    .or(`and(id_worker.eq.${IdUser}, id_contractor.eq.${OtherUser}), and(id_worker.eq.${OtherUser}, id_contractor.eq.${IdUser})`)
  return contracts
}
