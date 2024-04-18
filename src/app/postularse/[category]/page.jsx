import { getProposals } from '@/actions/getProposals'

export const dynamic = 'force-dynamic'

export default async function JobProposals ({ params }) {
  const { category } = params
  const proposals = await getProposals(category)

  return (
    <section>
      <h1>{category}</h1>
      <>
        {
          proposals.map((item) => (
            <div key={item.id_proposal} className='p-4 border-2 m-2 w-96'>
              <div>Presupuesto: {item.budget}</div>
              <div>Postularse para: {category}</div>
              <div>Ubicación: {item.location}</div>
              <div>Fecha de publicación: {item.open_date.slice(0, 10)}</div>
              <div>Descripción: {item.description}</div>
            </div>
          ))
        }
      </>
    </section>
  )
}
