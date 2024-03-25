import { getCategories } from '@/actions/getCategories'
import Link from 'next/link'

async function FindJobPage () {
  const categories = await getCategories()

  return (
    <>
      {
        categories.map((item) => (
          <div key={item.name} className='p-4 border-2 m-2 w-96'>
            <Link href={{ pathname: `/postularse/${item.name}` }}>Encontrar ofertas de: {item.name}</Link>
            <div>Nombre del oficio: {item.name}</div>
            <div> Descripcion: {item.description}</div>
          </div>
        ))
      }
    </>
  )
}

export default FindJobPage
