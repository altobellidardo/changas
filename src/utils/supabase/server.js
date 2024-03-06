import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function createSupabaseClient () {
  const supabase = createClient(supabaseUrl, supabaseKey)
  return supabase
}

export const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } }
    }
  )
  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  return supabase
}
