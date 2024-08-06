import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'
import Header from '@/components/header/header'
import { getWorkerRatings } from '@/actions/getWorkerRatings'
import Footer from '@/components/footer'
import StarIcon from '@/components/icons/Star'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ReviewsPage ({ searchParams }) {
  let IdUser
  const category = searchParams.category
  IdUser = searchParams.idUser

  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (!isAuthenticated) redirect('/')

  if (!IdUser) {
    IdUser = isAuthenticated.id_user
  }

  // Get users ratings
  const reviews = await getWorkerRatings(IdUser, category)
  // console.log(reviews)
  return (
    <main className='flex min-h-screen flex-col bg-brand8 justify-between'>
      <Header />
      <div className='w-[80w] mx-auto pb-10'>
        <section className='mt-10 flex flex-col gap-2'>
          <Link href='/perfil' className='text-brand5 hover:underline w-fit'>Volver</Link>
          <h2>Tus reseñas</h2>
          {
              reviews.length === 0
                ? <div className='text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600 max-w-[600px]'>No hay reseñas para este trabajo</div>
                : (
                  <ul className='max-w-full md:max-w-[600px]'>
                    {
                      reviews.map((item) => (
                        <li key={item.id_worker} className='p-4 border-2 mb-2 mx-2 rounded-md border-brand4/40'>
                          <span className='opacity-60 text-sm'>Descripción</span>
                          <div>{item.description}</div>
                          <span className='opacity-60 text-sm'>Puntaje</span>
                          <div className='flex flex-row gap-1 content-center text-xl'>
                            {item.score}/5
                            <StarIcon className='size-5 text-brand5' />
                          </div>
                          <span className='opacity-60 text-sm'>Fecha</span>
                          <div>{item.date.split('T')[0]}</div>
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
