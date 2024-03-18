'use server'

import supabase from '@/utils/supabase/server'

export async function getWorkers (IdCategory) {
  // console.log(IdCategory)
  const { data } = await supabase.from('workers').select().eq('id_category', IdCategory)

  const userIds = data.map((item) => (
    item.id_user
  ))

  const { usernames } = await supabase.from('users_real').select('name, surname').in('id_user', userIds)

  console.log(usernames)
  for (let i = 0; i < data.length; i++) {
    data[i].username = usernames[i].name
  }

  console.log(data)

  return data
}
