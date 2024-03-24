import { getWorkers } from '@/actions/getWorkers'

export default async function JobWorkers ({ params }) {
  const { category } = params
  const workers = await getWorkers(category)

  return (
    <section>
      <h1>{category}</h1>
      <>
        {
          workers.map((item) => (
            <div key={item.id_worker} className='p-4 border-2 m-2 w-96'>
              <div>Nombre del trabajador: {item.username}</div>
              <div>Nombre del oficio: {category}</div>
              <div>Precio por hora: {item.hourly_price}</div>
              <div>N° de empleados: {item.employees}</div>
              <div>Horas de atención: {item.attention_hours}</div>
              <div>Descripción: {item.description}</div>
            </div>
          ))
        }
      </>
    </section>
  )
}
