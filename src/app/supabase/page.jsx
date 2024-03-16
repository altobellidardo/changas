// import { supabaseServerClient } from '@/utils/supabase/server'
import supabase from '@/libs/supabase/server'

async function Supabase () {
  const { data } = await supabase.from('Posts').select()

  async function addPost (formData) {
    'use server'

    const content = formData.get('content')

    await supabase.from('Posts').insert({
      content
    })
  }

  return (
    <>
      <h1 className='text-3xl font-bold'>Posts</h1>
      <form action={addPost} className='flex flex-col gap-2 w-96 p-6'>
        <input type='text' name='content' className='border-2' />
        <button type='submit'>Add Post</button>
      </form>
      {data.length > 0 && (
        data.map((item) => (
          <div key={item.id} className='p-4 border-2 m-2 w-96'>
            {item.content} - Creado por el usuario {item.user_id}
          </div>
        ))
      )}
    </>
  )
}

export default Supabase
