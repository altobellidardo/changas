'use server'

import supabase from '@/libs/supabase/server'

export async function getPendingUsers () {
  const { data, error } = await supabase
    .from('users_data')
    .select('username, birth, dni, created_at, id_user')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) {
    return []
  }
  return data
}

export async function getUserDniImage (id, mode) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

  return `${SUPABASE_URL}/storage/v1/object/public/identities/${id}-${mode}`
}
