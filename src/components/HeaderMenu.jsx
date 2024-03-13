'use client'

import Link from 'next/link'
import HeaderPages from './HeaderPages'
import { useState } from 'react'

function CloseIcons () {
  return <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd' /></svg>
}

function OpenIcons () {
  return <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' /></svg>
}

function HeaderMenu () {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className='flex items-center lg:order-2'>
        <Link href='/auth/signin' className='mr-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-brand1 focus:outline-none focus:ring-4 focus:ring-gray-800 lg:px-5 lg:py-2.5'>
          Log in
        </Link>
        <Link href='/auth/signup' className='mr-2 rounded-lg bg-brand3 px-4 py-2 text-sm font-medium text-white hover:bg-brand1 focus:outline-none focus:ring-4 focus:ring-brand1 lg:px-5 lg:py-2.5'>
          Get started
        </Link>
        <button
          onClick={toggleMenu}
          type='button'
          className='ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 lg:hidden'
        >
          <span className='sr-only'>Open main menu</span>
          {isOpen ? <OpenIcons /> : <CloseIcons />}
        </button>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block flex items-center justify-between`}>
        <HeaderPages />
      </div>
    </>
  )
}

export default HeaderMenu
