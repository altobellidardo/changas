import { getProposals } from '@/actions/getProposals'

export default async function JobProposals ({ params }) {
  const { id_category: idCategory } = params
  const workers = await getProposals(idCategory)

  return (
    <section>
      <h1>{idCategory}</h1>
      <>
        {
          workers.map((item) => (
            <div key={item.id_proposal} className='p-4 border-2 m-2 w-96'>
              <div>Presupuesto: {item.budget}</div>
              <div>Postularse para: {idCategory}</div>
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
