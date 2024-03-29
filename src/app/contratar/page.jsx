import { getCategories } from '@/actions/getCategories'
import Link from 'next/link'

export const fetchCache = 'force-no-store'

async function FindWorkerPage () {
  const categories = await getCategories()

  return (
    <>
      {
        categories.map((item) => (
          <div key={item.name} className='p-4 border-2 m-2 w-96'>
            <Link href={{ pathname: `/contratar/${item.name}` }}>Encontrar: {item.name}s</Link>
            <div>Descripcion: {item.description}</div>
          </div>
        ))
      }
    </>
  )
}

export default FindWorkerPage
