import Link from 'next/link'
import Logo from '@/components/icons/logo'
import { getCategories } from '@/actions/getCategories'
import UploadWorker from './form'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'

async function UploadJob () {
  // Retrieve user ID from the query parameters
  // const IdUser = searchParams.user
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (!isAuthenticated) redirect('/')

  const IdUser = isAuthenticated.id_user
  const username = isAuthenticated.username
  const categories = await getCategories()

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <div className='w-full px-6 py-2.5 bg-brand5 flex justify-between items-center'>
        <Link href='/' className='size-9'>
          <Logo />
        </Link>
      </div>
      <section className='flex flex-col mt-20 justify-center items-center'>
        <h1 className='text-3xl font-bold'>
          Subir experiencia laboral
        </h1>

        <UploadWorker IdUser={IdUser} categories={categories} username={username} />
      </section>
    </main>
  )
}

export default UploadJob
