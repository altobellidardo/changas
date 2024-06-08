import supabase from '@/libs/supabase/server'

export async function getUserChats (IdUser) {
  // Declare var to return
  let data = []

  const chatsColumns = 'id_chat, id_user1, id_user2, username_1, username_2, read_user_1, read_user_2, last_message'
  const { data: chats } = await supabase.from('chats').select(chatsColumns)
    .or(`id_user1.eq.${IdUser}, id_user2.eq.${IdUser}`).order('last_message', { ascending: false })

  // Get the user Ids for the contracts filter
  const otherUsersIds = chats.reduce((acc, chat) => {
    if (chat.id_user1 !== IdUser) {
      acc.push(chat.id_user1)
    } else {
      acc.push(chat.id_user2)
    }
    return acc
  }, [])

  const contractsColumns = 'id_worker, id_contractor, closed, date'
  const { data: contracts } = await supabase.from('contracts').select(contractsColumns)
    .or(`and(id_worker.in.(${otherUsersIds}), id_contractor.eq.${IdUser}), and(id_contractor.in.(${otherUsersIds}), id_worker.eq.${IdUser})`)
    .eq('closed', false)

  // Main loop where every chat is mapped to a contract state
  data = chats
  for (let contractIndex = 0; contractIndex < contracts.length; contractIndex++) {
    for (let chatIndex = 0; chatIndex < otherUsersIds.length; chatIndex++) {
      const condition1 = otherUsersIds[chatIndex] === contracts[contractIndex].id_contractor
      const condition2 = otherUsersIds[chatIndex] === contracts[contractIndex].id_worker

      const IdInContract = condition1 || condition2
      /* console.log(`Los ids a comparar son: ${contracts[contractIndex].id_contractor} y ${contracts[contractIndex].id_worker}`)
      console.log(`El id del usuario es: ${otherUsersIds[chatIndex]}`)
      console.log(IdInContract, chatIndex) */
      if (contracts.length !== 0 && IdInContract) {
        data[chatIndex].open_contract = true
        data[chatIndex].contract_date = contracts[contractIndex].date
        chatIndex = otherUsersIds.length
      }
    }
  }
  return data
}
