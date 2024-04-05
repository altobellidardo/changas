/* eslint-disable @next/next/no-img-element */
import { getUser } from '@/actions/getUser'
import { getJobs } from '@/actions/getJobs'
import { getOffers } from '@/actions/getOffers'
import { getRatings } from '@/actions/getRatings'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import getLocation from '@/actions/getLocation'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import formatDate from '@/utils/formateDate'
import LocationIcon from '@/components/icons/LocationIcon'
import Header from '@/components/header/header'
import Footer from '@/components/footer'
import PenIcon from '@/components/icons/PenIcon'
import ShareProfile from './ShareProfile'

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
  // Gets users' average ratings
  const ratings = await getRatings(IdUser, jobs)
  await getLocation('Cardales, Buenos Aires')
  user.picture = user.picture ? user.picture : 'https://avatar.iran.liara.run/public/boy?username=' + user.name

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <Header />
      <div className='w-[80w] mx-auto pb-10'>
        <h1 className='text-xl my-4 pt-14 flex flex-col items-center md:items-start'>
          Tu perfil <ShareProfile IdUser={IdUser} />
        </h1>

        <section className='flex flex-col md:flex-row items-center bg-brand4 text-brand8 justify-center gap-8 py-10 w-[80vw] mx-auto rounded-md'>
          <picture className='relative'>
            <div className='absolute right-0 rounded-full bg-brand3 p-2'>
              <Link href='/auth/change-profile'>
                <PenIcon />
              </Link>
            </div>
            <img className='rounded-full size-40' src={user.picture} alt={`${user.name} ${user.surname} picture`} />
          </picture>
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
        </section>

        <section className='mt-10 flex flex-col gap-2'>
          <h2>Tus trabajos</h2>
          {
            jobs.length === 0
              ? <div className='text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600 max-w-[600px]'>No has subido trabajos</div>
              : (
                <ul>
                  {
                    jobs.map((item) => (
                      <li key={item.id_worker} className='p-4 border-2 m-2 w-96'>
                        <div>Nombre del oficio: {item.category}</div>
                        <div>Precio por hora: {item.hourly_price}</div>
                        <div>N° de empleados: {item.employees}</div>
                        <div>Horas de atención: {item.attention_hours}</div>
                        <div>Descripción: {item.description}</div>
                        <div>Promedio de reseñas: {ratings[item.category]}</div>
                      </li>
                    ))
                    }
                </ul>
                )
          }
          <Link className='rounded-xl px-4 py-2 font-semibold bg-brand4 text-brand8 text-center max-w-[600px]' href={{ pathname: '/subirtrabajo', query: { user: IdUser } }}>
            Subir experiencia laboral
          </Link>
        </section>

        <section className='mt-10 flex flex-col gap-2'>
          <h2>Propuestas publicadas por vos</h2>
          {
            offers.length === 0
              ? <div className='text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600 max-w-[600px]'>No has publicado ofertas laborales</div>
              : (
                <ul>
                  {
                    offers.map((item) => (
                      <li key={item.id_proposal} className='p-4 border-2 m-2 w-96'>
                        <div>Buscando: {item.category}s</div>
                        <div>Presupuesto: {item.budget}</div>
                        <div>Ubicación: {item.location}</div>
                        <div>Fecha de publicación: {item.open_date.slice(0, 10)}</div>
                        <div>Descripción: {item.description}</div>
                      </li>
                    ))
                  }
                </ul>
                )
          }
          <Link className='rounded-xl px-4 py-2 font-semibold bg-brand4 text-brand8 text-center max-w-[600px]' href={{ pathname: '/subiroferta', query: { user: IdUser } }}>
            Subir oferta laboral
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  )
}
