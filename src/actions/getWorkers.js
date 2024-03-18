'use server'

import supabase from '@/utils/supabase/server'

export async function getWorkers (IdCategory) {
  const { data } = await supabase.from('workers').select()
  // .eq('id_category', IdCategory)
    .in('id_category', [IdCategory])

  const userIds = data.map(item => item.id_user)

  const { data: usernames } = await supabase.from('users_real').select('name, surname').in('id_user', userIds)

  for (let i = 0; i < data.length; i++) {
    const { name, surname } = usernames[i]
    data[i].username = `${name} ${surname}`
  }

  console.log(data)

  return data
}
