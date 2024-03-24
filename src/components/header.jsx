/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import HeaderMenu from './HeaderMenu'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'

function Header () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)

  return (
    <header className='bg-brand5'>
      <nav className='px-4 py-2.5 lg:px-6 flex justify-between items-center max-w-[1200px] mx-auto'>
        <Link
          href='/'
          className='flex items-center gap-3 text-brand8 hover:text-brand1'
        >
          <img
            src='/logo.svg'
            className='size-9'
            alt='Changas logo'
          />
          <span
            className='hidden self-center whitespace-nowrap text-2xl font-semibold sm:block'
          >
            Changas
          </span>
        </Link>

        <div className='lg:hidden' />

        <HeaderMenu auth={isAuthenticated} />
      </nav>
    </header>
  )
}

export default Header
