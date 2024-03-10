/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

// import { currentUser, UserButton } from '@clerk/nextjs'

async function Header () {
  // const user = await currentUser()

  return (
    <header>
      <nav className='bg-brand5 px-4 lg:px-6 py-2.5'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <Link href='/' className='text-brand8 hover:text-brand1 flex items-center gap-3'>
            <img src='/logo.svg' className='size-9' alt='Logo' />
            <span className='self-center text-2xl font-semibold whitespace-nowrap hidden sm:block'>Changas</span>
          </Link>
          <div className='flex items-center lg:order-2'>
            <Link href='/auth/signin' className='text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-brand1 focus:outline-none focus:ring-gray-800'>
              Log in
            </Link>
            <Link href='/auth/signup' className='text-white bg-brand3 hover:bg-brand1 focus:ring-4 focus:ring-brand1 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
              Get started
            </Link>
            {/* {user
              ? <UserButton />
              : (
                <>
                  <Link href='/auth/signin' className='text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-brand1 focus:outline-none focus:ring-gray-800'>
                    Log in
                  </Link>
                  <Link href='/auth/signup' className='text-white bg-brand3 hover:bg-brand1 focus:ring-4 focus:ring-brand1 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                    Get started
                  </Link>
                </>
                )} */}
            <button
              data-collapse-toggle='mobile-menu-2'
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden focus:outline-none focus:ring-2 text-gray-100 hover:bg-gray-700 focus:ring-gray-600'
              aria-controls='mobile-menu-2'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd' /></svg>
              <svg className='hidden w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' /></svg>
            </button>
          </div>
          <div className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1' id='mobile-menu-2'>
            <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
              <li>
                <Link href='/' className='block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 text-white' aria-current='page'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/nosotros' className='block py-2 pr-4 pl-3 border-b lg:border-0 lg:hover:text-primary-700 lg:p-0 text-gray-300 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700'>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href='/contacto' className='block py-2 pr-4 pl-3 border-b lg:border-0 lg:hover:text-primary-700 lg:p-0 text-gray-300 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700'>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
