import { getUser } from '@/actions/getUser'
import { getJobs } from '@/actions/getJobs'
import { getOffers } from '@/actions/getOffers'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import formatDate from '@/utils/formateDate'
import Header from '@/components/header/header'
import Footer from '@/components/footer'
import ShareProfile from './ShareProfile'
import StarIcon from '@/components/icons/Star'
import ProfileCard from '@/components/ProfileCard'

export const dynamic = 'force-dynamic'

export default async function UserPage () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (!isAuthenticated) redirect('/')

  // Retrieve data from JWT
  const { id_user: IdUser, username } = isAuthenticated

  // Gets main user's data
  const user = await getUser(IdUser)
  // Gets jobs developed by the user
  const jobs = await getJobs(IdUser)
  // Gets published job offers by the user
  const offers = await getOffers(IdUser)

  user.picture = user.picture ? user.picture : 'https://avatar.iran.liara.run/public/boy?username=' + user.name

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <Header />
      <div className='w-[80w] mx-auto pb-10'>
        <h1 className='text-xl my-4 pt-14 flex flex-col items-center md:items-start'>
          Tu perfil <ShareProfile IdUser={IdUser} />
        </h1>

        <ProfileCard user={user} username={username} />

        <section className='mt-10 flex flex-col gap-2'>
          <h2>Tus trabajos</h2>
          {
            jobs.length === 0
              ? <div className='text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600 max-w-[600px]'>No has subido trabajos</div>
              : (
                <ul className='max-w-full md:max-w-[600px]'>
                  {
                    jobs.map((item) => (
                      <li key={item.id_worker} className='p-4 border-2 mb-2 mx-2 rounded-md border-brand4/40'>
                        <span className='opacity-60 text-sm'>Nombre del oficio</span>
                        <div>{item.category}</div>
                        <span className='opacity-60 text-sm'>Precio por hora</span>
                        <div>${item.hourly_price}</div>
                        <span className='opacity-60 text-sm'>Cantidad de empleados</span>
                        <div>{item.employees}</div>
                        <span className='opacity-60 text-sm'>Horas de atención</span>
                        <div>{item.attention_hours}</div>
                        <span className='opacity-60 text-sm'>Descripción</span>
                        <div>{item.description}</div>
                        <span className='opacity-60 text-sm'>Puntaje</span>
                        <div className='flex flex-row gap-1 content-center text-xl'>
                          {item.score}/5
                          <StarIcon className='size-5 text-brand5' />
                        </div>
                        <div className='flex justify-start items-center'>
                          <Link className='rounded-xl bg-brand4 text-brand8 px-4 py-2 mt-2' href={{ pathname: '/perfil/vercriticas', query: { category: item.category } }}>
                            Reseñas
                          </Link>
                        </div>
                      </li>
                    ))
                    }
                </ul>
                )
          }
          <Link className='rounded-xl px-4 py-2 font-semibold bg-brand4 text-brand8 text-center max-w-[600px]' href='/subirtrabajo'>
            Subir experiencia laboral
          </Link>
        </section>

        <section className='mt-10 flex flex-col gap-2'>
          <h2>Propuestas publicadas por vos</h2>
          {
            offers.length === 0
              ? <div className='text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600 max-w-[600px]'>No has publicado ofertas laborales</div>
              : (
                <ul className='max-w-full md:max-w-[600px]'>
                  {
                    offers.map((item) => (
                      <li key={item.id_proposal} className='p-4 border-2 mb-2 mx-2 rounded-md border-brand4/40'>
                        <span className='opacity-60 text-sm'>Categoría</span>
                        <div>{item.category}</div>
                        <span className='opacity-60 text-sm'>Presupuesto</span>
                        <div>{item.budget}</div>
                        <span className='opacity-60 text-sm'>Ubicación</span>
                        <div>{item.location}</div>
                        <span className='opacity-60 text-sm'>Fecha de publicación</span>
                        <div>{formatDate(item.open_date.slice(0, 10))}</div>
                        <span className='opacity-60 text-sm'>Descripción</span>
                        <div>{item.description}</div>
                      </li>
                    ))
                  }
                </ul>
                )
          }
          <Link className='rounded-xl px-4 py-2 font-semibold bg-brand4 text-brand8 text-center max-w-[600px]' href='/subiroferta'>
            Subir oferta laboral
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  )
}
