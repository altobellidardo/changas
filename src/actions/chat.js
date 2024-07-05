'use server'

import supabase from '@/libs/supabase/server'

export async function getMessages () {
  const { data: messages } = await supabase
    .from('chat-test')
    .select('*')
    .order('id', { ascending: false })

  return messages
}

export async function sendMessage (formData) {
  const msg = formData.get('msg')

  await supabase
    .from('chat-test')
    .insert({ msg, from: true })
}
