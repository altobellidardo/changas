import { getUser } from '@/actions/getUser'
import { getJobs } from '@/actions/getJobs'
import { getOffers } from '@/actions/getOffers'

import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import Header from '@/components/header/header'
import Footer from '@/components/footer'
import ShareProfile from './ShareProfile'
import ProfileCard from '@/components/ProfileCard'
import JobCard from '@/components/JobCard'
import ProposalCard from '@/components/ProposalCard'
import PlusIcon from '@/components/icons/PlusIcon'
import NoData from '@/components/ui/NoData'
import Tooltip from '@/components/ui/Tooltip'

export const dynamic = 'force-dynamic'

function UploadNew ({ children, href, description }) {
  return (
    <div className='relative group inline-block'>
      <Link className='rounded-xl px-4 py-2 font-semibold bg-brand4 text-brand8 text-center max-w-[600px] flex gap-2 items-center justify-center' href={href}>
        <PlusIcon className='inline size-10' />
        {children}
      </Link>
      <Tooltip text={description} />
    </div>
  )
}

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
      <Header />
      <div className='w-[80w] mx-auto pb-10'>
        <h1 className='text-xl my-4 pt-14 flex flex-col items-center md:items-start'>
          Tu perfil <ShareProfile IdUser={IdUser} />
        </h1>

        <ProfileCard user={user} />

        <section className='mt-10 flex flex-col gap-2'>
          <h2>Tus oficios registrados</h2>

          {jobs.length === 0
            ? <NoData>No has registrado ningún oficio</NoData>
            : (
              <ul className='max-w-full md:max-w-[600px]'>
                {jobs.map((item) => (
                  <JobCard job={item} key={item.id_worker} IdUser={IdUser} />
                ))}
              </ul>
              )}

          <UploadNew href='/subirtrabajo' description='Cargue su oficio para que los clientes lo contacten'>Subir nuevo oficio</UploadNew>
        </section>

        <section className='mt-10 flex flex-col gap-2'>
          <h2>Propuestas laborales publicadas por vos</h2>
          {offers.length === 0
            ? <NoData>No has publicado ofertas laborales</NoData>
            : (
              <ul className='max-w-full md:max-w-[600px]'>
                {offers.map((item) => (
                  <ProposalCard proposal={item} key={item.id_proposal} IdUser={IdUser} />
                ))}
              </ul>
              )}

          <UploadNew href='/subiroferta' description='Suba una propuesta de trabajo para que proveedores la vean'>Subir nueva oferta laboral</UploadNew>
        </section>
      </div>
      <Footer />
    </main>
  )
}
