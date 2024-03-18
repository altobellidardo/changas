import { getWorkers } from '@/actions/getWorkers'

export default async function JobWorkers ({ params }) {
  const workers = await getWorkers(params.id_category)

  return (
    <>
      {
        workers.map((item) => (
          <div key={item.id_job} className='p-4 border-2 m-2 w-96'>
            <div>Nombre del trabajador: {item.id_user}</div>
            <div>Nombre del oficio: {params.id_category}</div>
            <div>Precio por hora: {item.hourly_price}</div>
            <div>N° de empleados: {item.employees}</div>
            <div>Horas de atención: {item.attention_hours}</div>
            <div>Descripción: {item.description}</div>
            <div>Reseñas: {item.reviews}</div>
          </div>
        ))
      }
    </>
  )
}
