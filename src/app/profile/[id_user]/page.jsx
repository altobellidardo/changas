import { getUser } from '@/actions/getUser'
import { getJobs } from '@/actions/getJobs'
import { getOffers } from '@/actions/getOffers'
// import Link from 'next/link'

export default async function UserPage ({ params }) {
  const { id_user: IdUser } = params
  // Gets main user's data
  const user = await getUser(IdUser)
  // Gets jobs developed by the user
  const jobs = await getJobs(IdUser)
  // Gets published job offers by the user
  const offers = await getOffers(IdUser)

  return (
    <>
      <h1>Información del usuario</h1>
      <div className='p-4 border-2 m-2 w-96'>
        <div>Nombre: {user.name}</div>
        <div>Apellido: {user.surname}</div>
        <div>Mail: {user.email}</div>
        <div>Teléfono: {user.phone}</div>
        <div>Ubicación: {user.location}</div>
        <div>DNI: {user.dni}</div>
        <div>Nacimiento: {user.birth}</div>
        <div>Foto de perfil: {user.picture}</div>
      </div>
      <div>
        <h1>Trabajos del usuario</h1>
        {
          jobs.map((item) => (
            <div key={item.id_job} className='p-4 border-2 m-2 w-96'>
              <div>Nombre del oficio: {item.id_category}</div>
              <div>Precio por hora: {item.hourly_price}</div>
              <div>N° de empleados: {item.employees}</div>
              <div>Horas de atención: {item.attention_hours}</div>
              <div>Descripción: {item.description}</div>
              <div>Reseñas: {item.reviews}</div>
            </div>
          ))
        }
      </div>
      <div>
        <h1>Porpuestas publicadas por el usuario</h1>
        {
          offers.map((item) => (
            <div key={item.id_proposal} className='p-4 border-2 m-2 w-96'>
              <div>Buscando: {item.id_category}s</div>
              <div>Presupuesto: {item.budget}</div>
              <div>Ubicación: {item.location}</div>
              <div>Fecha de publicación: {item.open_date}</div>
              <div>Descripción: {item.description}</div>
            </div>
          ))
        }
      </div>
    </>
  )
}
