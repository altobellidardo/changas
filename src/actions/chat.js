'use server'

import supabase from '@/libs/supabase/server'

export async function sendMessage (formData) {
  const { message } = formData.get('msg')

  const { data, error } = await supabase
    .from('chat-test')
    .select('*')
}
