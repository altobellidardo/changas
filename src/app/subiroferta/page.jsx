import Logo from '@/components/icons/logo'
import { getCategories } from '@/actions/getCategories'
import Link from 'next/link'
import UploadOffert from './form'

async function UploadProposal ({ searchParams }) {
  const IdUser = searchParams.user
  const categories = await getCategories()

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <div className='w-full px-6 py-2.5 bg-brand5 flex justify-between items-center'>
        <Link href='/' className='size-9'>
          <Logo />
        </Link>
      </div>
      <UploadOffert IdUser={IdUser} categories={categories} />
    </main>
  )
}

export default UploadProposal
