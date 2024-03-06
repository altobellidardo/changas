import { supabaseClient } from '@/utils/supabase/server'
import { auth } from '@clerk/nextjs'

async function Supabase () {
  const { getToken } = auth()
  const supabaseToken = await getToken({ template: 'supabase' })
  const supabase = await supabaseClient(supabaseToken)

  const { data, error } = await supabase.from('Posts').select()
  console.log('data', data)
  console.log('error', error)

  return (
    <>
      <div>Supabase</div>
      {data.length > 0 && data.map((item) => <div key={item.id}>{item.content}</div>)}
    </>
  )
}

export default Supabase
