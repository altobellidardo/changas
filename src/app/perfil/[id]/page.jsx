import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getUser } from '@/actions/getUser'
import { getJobs } from '@/actions/getJobs'
import { getOffers } from '@/actions/getOffers'
import Header from '@/components/header/header'
import Footer from '@/components/footer'
import LocationIcon from '@/components/icons/LocationIcon'
import formatDate from '@/utils/formateDate'
import ShareProfile from '../ShareProfile'

import ProposalInfo from '@/components/ProposalInfo'
import JobInfo from '@/components/JobInfo'
import NoData from '@/components/ui/NoData'

async function OtherProfilePage ({ params }) {
  const { id: IdUser } = params

  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)

  if (isAuthenticated && isAuthenticated.id_user === IdUser) {
    redirect('/perfil')
  }

  // Gets main user's data
  const user = await getUser(IdUser)
  // Gets jobs developed by the user
  const jobs = await getJobs(IdUser)
  // Gets published job offers by the user
  const offers = await getOffers(IdUser)

  user.picture = user.picture ? user.picture : 'https://avatar.iran.liara.run/public/boy?username=' + user.name

  // Create username (name + surname)
  const username = user.name + ' ' + user.surname

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <Header />
      <div className='w-[80w] mx-auto pb-10'>
        <h1 className='text-xl my-4 pt-14 flex flex-col items-center md:items-start'>
          Perfil de {user.name} {user.surname} <ShareProfile IdUser={IdUser} />
        </h1>

        <section className='flex flex-col md:flex-row items-center bg-brand4 text-brand8 justify-center gap-8 py-10 w-[80vw] mx-auto rounded-md'>
          <picture className='relative'>
            <img className='rounded-full size-40' src={user.picture} alt={`${user.name} ${user.surname} picture`} />
          </picture>
          <div>
            <div className='font-bold text-xl'>{username}</div>
            <div className='flex'>
              <LocationIcon /> {user.location}
            </div>
            <div>{formatDate(user.birth)}</div>
            <Link href={{ pathname: '/chats/nuevochat', query: { idUser2: IdUser, Username2: username } }}>Contactar</Link>
          </div>
        </section>

        <section className='mt-10 flex flex-col gap-2'>
          <h2>Oficios de {username}</h2>
          {
            jobs.length === 0
              ? <NoData>{username} no ha registrado ningún oficio</NoData>
              : (
                <ul>
                  {
                    jobs.map((item) => (
                      <li key={item.id_worker} className='p-4 border-2 m-2 w-96'>
                        <JobInfo job={item} IdUser={IdUser} />
                      </li>
                    ))
                    }
                </ul>
                )
          }
        </section>

        <section className='mt-10 flex flex-col gap-2'>
          <h2>Propuestas laborales publicadas por {username}</h2>
          {
            offers.length === 0
              ? <NoData>{username} no ha publicado ninguna oferta laboral</NoData>
              : (
                <ul>
                  {
                    offers.map((item) => (
                      <li key={item.id_proposal} className='p-4 border-2 m-2 w-96'>
                        <ProposalInfo proposal={item} />
                      </li>
                    ))
                  }
                </ul>
                )
          }
        </section>
      </div>
      <Footer />
    </main>
  )
}

export default OtherProfilePage
