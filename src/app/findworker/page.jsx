import { getCategories } from '@/actions/getCategories'

async function FindWorkerPage () {
  const categories = await getCategories()

  return (
    <>
      {
        categories.map((item) => (
          <div key={item.id_category} className='p-4 border-2 m-2 w-96'>
            <a href={`/findworker/${item.id_category}`}> Encontrar {item.titulo}</a>
            <div>Nombre del oficio: {item.titulo} Descripcion: {item.descripcion}</div>
          </div>
        ))
      }
    </>
  )
}

export default FindWorkerPage
