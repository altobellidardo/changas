/* eslint-disable @next/next/no-img-element */
import { getUser } from '@/actions/getUser'
import { getJobs } from '@/actions/getJobs'
import { getOffers } from '@/actions/getOffers'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import formatDate from '@/utils/formateDate'
import LocationIcon from '@/components/icons/LocationIcon'

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

  user.picture = user.picture ? user.picture : 'https://avatar.iran.liara.run/public/boy?username=' + user.name

  return (
    <main className='flex min-h-screen flex-col bg-brand8 max-w-[80vw] mx-auto gap-10'>
      <h1>Perfil del usuario</h1>
      <section className='flex bg-brand4 text-brand8 justify-center gap-8 py-10 w-[80vw] mx-auto rounded-md'>
        <div>
          <div className='font-bold text-xl'>{user.name} {user.surname}</div>
          <div>{user.email}</div>
          <div>Teléfono: {user.phone}</div>
          <div className='flex'>
            <LocationIcon /> {user.location}
          </div>
          <div>DNI: {user.dni}</div>
          <div>{formatDate(user.birth)}</div>
        </div>
        <img className='rounded-full size-40' src={user.picture} alt={`${user.name} ${user.surname} picture`} />
      </section>
      <h1>Trabajos del usuario</h1>
      {
        jobs.map((item) => (
          <div key={item.id_worker} className='p-4 border-2 m-2 w-96'>
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
