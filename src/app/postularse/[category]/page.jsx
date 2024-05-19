import Footer from '@/components/footer'
import Header from '@/components/header'
import Link from 'next/link'
import Filters from './filters'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function JobProposals ({ params }) {
  let { category } = params

  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (!isAuthenticated) redirect('/')

  // Retrieve data from JWT
  const { id_user: IdUser } = isAuthenticated

  category = decodeURIComponent(category).replace(/%20/g, ' ')

  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <Header />
      <section className='pt-10 w-[80vw] max-w-[1200px] mx-auto my-10'>
        <Link href='/contratar' className='text-brand6 hover:underline mb-2'>Atrás</Link>
        <h1 className='text-3xl font-bold mb-4'>
          Encontrar trabajo de {category}
        </h1>

        <Filters category={category} IdUser={IdUser} />
      </section>
      <Footer />
    </main>
  )
}
