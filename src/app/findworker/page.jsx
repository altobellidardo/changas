import { getCategories } from '@/actions/getCategories'
import Link from 'next/link'

async function FindWorkerPage () {
  const categories = await getCategories()

  return (
    <>
      {
        categories.map((item) => (
          <div key={item.id_category} className='p-4 border-2 m-2 w-96'>
            <Link href={{ pathname: `/findworker/${item.id_category}` }}>Encontrar: {item.id_category}s</Link>
            <div>Nombre del oficio: {item.id_category} Descripcion: {item.descripcion}</div>
          </div>
        ))
      }
    </>
  )
}

export default FindWorkerPage
