import Logo from '@/components/icons/logo'
import { getCategories } from '@/actions/getCategories'
import Link from 'next/link'
import UploadOffert from './form'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import { redirect } from 'next/navigation'

async function UploadProposal () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (!isAuthenticated) redirect('/')

  // Retrieve data from JWT
  const { id_user: IdUser, username: Username } = isAuthenticated

  const categories = await getCategories()

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <div className='w-full px-6 py-2.5 bg-brand5 flex justify-between items-center'>
        <Link href='/' className='size-9'>
          <Logo />
        </Link>
      </div>
      <UploadOffert IdUser={IdUser} Username={Username} categories={categories} />
    </main>
  )
}

export default UploadProposal
