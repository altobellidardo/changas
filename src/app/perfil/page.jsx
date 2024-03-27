import { getUser } from '@/actions/getUser'
import { getJobs } from '@/actions/getJobs'
import { getOffers } from '@/actions/getOffers'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'
import Logo from '@/components/icons/logo'
import Link from 'next/link'

export default async function UserPage () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)

  if (!isAuthenticated) redirect('/')

  // Retrieve data from JWT
  const { id_user: IdUser } = isAuthenticated

  // Gets main user's data
  const user = await getUser(IdUser)
  // Gets jobs developed by the user
  const jobs = await getJobs(IdUser)
  // Gets published job offers by the user
  const offers = await getOffers(IdUser)

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <div className='w-full px-6 py-2.5 bg-brand5 flex justify-between items-center'>
        <Link href='/' className='size-9'>
          <Logo />
        </Link>
      </div>
      <h1>Información del usuario</h1>
      <div className='p-4 border-2 m-2 w-96' key={user.id_user}>
        <div>Nombre: {user.name}</div>
        <div>Apellido: {user.surname}</div>
        <div>Mail: {user.email}</div>
        <div>Teléfono: {user.phone}</div>
        <div>Ubicación: {user.location}</div>
        <div>DNI: {user.dni}</div>
        <div>Nacimiento: {user.birth}</div>
        <div>Foto de perfil: {user.picture}</div>
      </div>
      <h1>Trabajos del usuario</h1>
      {
          jobs.map((item) => (
            <div key={item.id_job} className='p-4 border-2 m-2 w-96'>
              <div>Nombre del oficio: {item.category}</div>
              <div>Precio por hora: {item.hourly_price}</div>
              <div>N° de empleados: {item.employees}</div>
              <div>Horas de atención: {item.attention_hours}</div>
              <div>Descripción: {item.description}</div>
              <div>Reseñas: </div>
            </div>
          ))
      }
      <h1>Propuestas publicadas por el usuario</h1>
      {
          offers.map((item) => (
            <div key={item.id_proposal} className='p-4 border-2 m-2 w-96'>
              <div>Buscando: {item.category}s</div>
              <div>Presupuesto: {item.budget}</div>
              <div>Ubicación: {item.location}</div>
              <div>Fecha de publicación: {item.open_date.slice(0, 10)}</div>
              <div>Descripción: {item.description}</div>
            </div>
          ))
      }
      <Link href={{ pathname: '/subiroferta', query: { user: IdUser } }}>
        <div>
          Subir oferta laboral
        </div>
      </Link>
      <div>
        -----------------------------------------------------------------
        -----------------------------------------------------------------
        -----------------------------------------------------------------
      </div>
      <Link href={{ pathname: '/subirtrabajo', query: { user: IdUser } }}>
        <div>
          Subir experiencia laboral
        </div>
      </Link>
    </main>
  )
}
