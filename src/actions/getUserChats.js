import supabase from '@/libs/supabase/server'

export async function getUserChats (IdUser) {
  // Declare var to return
  let data = []

  const chatsColumns = 'id_chat, id_user1, id_user2, username_1, username_2, read_user_1, read_user_2, last_message'
  const { data: chats } = await supabase.from('chats').select(chatsColumns)
    .or(`id_user1.eq.${IdUser}, id_user2.eq.${IdUser}`).order('last_message', { ascending: false })

  // Get the user Ids for the contracts filter
  let OtherUsersIds = chats
    .filter(chat => chat.id_user1 !== IdUser)
    .map(chat => chat.id_user1)

  OtherUsersIds = OtherUsersIds.concat(chats
    .filter(chat => chat.id_user2 !== IdUser)
    .map(chat => chat.id_user2))

  const contractsColumns = 'id_worker, id_contractor, closed, date'
  const { data: contracts } = await supabase.from('contracts').select(contractsColumns)
    .or(`and(id_worker.in.(${OtherUsersIds}), id_contractor.eq.${IdUser}), and(id_contractor.in.(${OtherUsersIds}), id_worker.eq.${IdUser})`)
    .eq('closed', false)

  // Main loop where every chat is mapped to a contract state
  data = chats
  let lastContractIndex = 0
  let finishedContracts = false

  console.log(contracts)

  for (let i = 0; i < OtherUsersIds.length; i++) {
    for (let contractIndex = lastContractIndex; contractIndex < contracts.length; contractIndex++) {
      console.log(`El índice del contrato es: ${contractIndex}`)
      const condition1 = OtherUsersIds[i] === contracts[contractIndex].id_contractor
      const condition2 = OtherUsersIds[i] === contracts[contractIndex].id_worker

      const IdInContract = condition1 || condition2
      console.log(`Los ids del contrato son: ${contracts[contractIndex].id_contractor} y ${contracts[contractIndex].id_worker}`)
      console.log(`El id del user es: ${OtherUsersIds[i]}`)
      console.log(IdInContract)
      if (contracts.length !== 0 && IdInContract && !finishedContracts) {
        data[i].open_contract = true
        data[i].contract_date = contracts[contractIndex].date
        contractIndex = contracts.length
        // console.log((OtherUsersIds[i] === contracts[contractIndex].id_contractor) || (OtherUsersIds[i] === contracts[contractIndex].id_worker))
        // If I did not iterate over the second to last contract I add 1 to the contract index to do not
        // iterate again over contracts that were already analyzed
        if (lastContractIndex < contracts.length - 1) {
          lastContractIndex += 1
        } else {
          finishedContracts = true
        }
      }
    }
  }
  return data
}
