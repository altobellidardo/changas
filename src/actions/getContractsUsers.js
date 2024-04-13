import supabase from '@/libs/supabase/server'

export async function getContractsUsers (IdUser, OtherUser) {
  const { data: contracts } = await supabase.from('contracts').select()
    .or(`and(id_worker.eq.${IdUser}, id_contractor.eq.${OtherUser}), and(id_worker.eq.${OtherUser}, id_contractor.eq.${IdUser})`)
    .order('date', { ascending: false })

  const IdContracts = contracts.map(contract => contract.id_contract)

  const { data: reviews } = await supabase.from('reviews').select('id_contract,score')
    .or(`and(id_reviewer_user.eq.${IdUser}, id_reviewed_user.eq.${OtherUser}),and(id_reviewer_user.eq.${OtherUser}, id_reviewed_user.eq.${IdUser})`)

  const response = []
  for (let i = 0; i < IdContracts.length; i++) {
    response[i] = contracts[i]
    for (let j = 0; j < reviews.length; j++) {
      if (IdContracts[i] === reviews[j].id_contract) { response[i].score = reviews[j].score; break }
    }
  }

  return response
}
