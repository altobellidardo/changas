import { getCategories } from '@/app/actions/getCategories'
import supabase from '@/utils/supabase/server'

async function DashboardPage () {
  const categories = await getCategories()

  async function createCategory (data) {
    'use server'

    const titulo = data.get('titulo')
    const descripcion = data.get('descripcion')

    const newCategory = {
      titulo,
      descripcion
    }

    const { error } = await supabase.from('categories').insert(newCategory)

    if (error) console.error(error.message)
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(categories, null, 2)}</pre>

      <form action={createCategory}>
        <label>
          titulo
          <input type='text' name='titulo' />
        </label>
        <label>
          description
          <input type='text' name='descripcion' />
        </label>

        <button type='submit'>Enviar</button>
      </form>
    </div>
  )
}

export default DashboardPage
