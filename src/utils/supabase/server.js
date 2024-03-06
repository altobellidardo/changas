import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function supabaseServerClient () {
  const { getToken } = auth()
  const supabaseToken = await getToken({ template: 'supabase' })
  const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    {
      global: { headers: { Authorization: `Bearer ${supabaseToken}` } }
    }
  )

  return supabase
}
