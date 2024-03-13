/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import HeaderMenu from './HeaderMenu'

function Header () {
  return (
    <header>
      <nav className='bg-brand5 px-4 py-2.5 lg:px-6'>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between'>
          <Link href='/' className='flex items-center gap-3 text-brand8 hover:text-brand1'>
            <img src='/logo.svg' className='size-9' alt='Logo' />
            <span className='hidden self-center whitespace-nowrap text-2xl font-semibold sm:block'>Changas</span>
          </Link>

          <HeaderMenu />
        </div>
      </nav>
    </header>
  )
}

export default Header
