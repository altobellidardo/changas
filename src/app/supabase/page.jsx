import { supabaseClient } from '@/utils/supabase/server'
import { auth } from '@clerk/nextjs'

async function Supabase () {
  const { getToken } = auth()
  const supabaseToken = await getToken({ template: 'supabase' })
  console.log('token', supabaseToken)

  const client = await supabaseClient(supabaseToken)

  const { data, error } = client.from('Posts').select()
  console.log('data', data)
  console.log('error', error)

  return (
    <>
      <div>Supabase</div>
    </>
  )
}

export default Supabase
