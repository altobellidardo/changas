import Logo from '@/components/icons/logo'
import Link from 'next/link'
import UploadUser from './form'

function SignUp () {
  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <div className='w-full px-6 py-2.5 bg-brand5 flex justify-between items-center'>
        <Link href='/' className='size-9'>
          <Logo />
        </Link>
      </div>
      <UploadUser />
    </main>
  )
}

export default SignUp
