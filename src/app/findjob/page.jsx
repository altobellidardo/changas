import { getCategories } from '@/actions/getCategories'
import Link from 'next/link'

async function FindJobPage () {
  const categories = await getCategories()

  return (
    <>
      {
        categories.map((item) => (
          <div key={item.id_category} className='p-4 border-2 m-2 w-96'>
            <Link href={{ pathname: `/findjob/${item.id_category}`, query: { category: item.titulo } }}>Encontrar ofertas de: {item.titulo}</Link>
            <div>Nombre del oficio: {item.titulo} Descripcion: {item.descripcion}</div>
          </div>
        ))
      }
    </>
  )
}

export default FindJobPage
