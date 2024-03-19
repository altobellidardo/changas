import { getProposals } from '@/actions/getProposals'

export default async function JobProposals ({ params, searchParams }) {
  const { id_category: idCategory } = params
  const { category } = searchParams
  const workers = await getProposals(idCategory)

  return (
    <section>
      <h1>{category}</h1>
      <>
        {
          workers.map((item) => (
            <div key={item.id_proposal} className='p-4 border-2 m-2 w-96'>
              <div>Presupuesto: {item.budget}</div>
              <div>Postularse para: {category}</div>
              <div>Ubicación: {item.location}</div>
              <div>Fecha de publicación: {item.open_date}</div>
              <div>Descripción: {item.description}</div>
            </div>
          ))
        }
      </>
    </section>
  )
}
