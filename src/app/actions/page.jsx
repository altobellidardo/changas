// import { supabaseServerClient } from '@/utils/supabase/server'
import supabase from '@/utils/supabase/server'

async function Action () {
  const { data: categories } = await supabase.from('categories').select()

  return (
    <>
      <h1> {categories[0].titulo} </h1>
    </>
  )
}

export default Action
