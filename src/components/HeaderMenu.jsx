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

function HeaderMenu ({ auth }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const logOut = () => {
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => window.location.reload())
  }

  return (
    <>
      <div className='flex items-center lg:order-2 gap-2'>
        {!auth
          ? (
            <>
              <Link
                href='/auth/signin'
                className='rounded-lg px-1 py-2 text-xs sm:px-2 sm:text-sm text-white hover:bg-brand1 focus:outline-none focus:ring-4 focus:ring-gray-800 lg:px-5 lg:py-2.5'
              >
                Iniciar sesión
              </Link>
              <Link
                href='/auth/signup'
                className='rounded-lg px-1 py-2 text-xs sm:px-2 sm:text-sm text-white hover:bg-brand1 focus:outline-none focus:ring-4 bg-brand3 focus:ring-brand1 lg:px-5 lg:py-2.5'
              >
                Crear cuenta
              </Link>
            </>
            )
          : (
            <button
              onClick={logOut}
              className='rounded-lg bg-brand3 px-4 py-2 text-sm text-white hover:bg-brand1 focus:outline-none focus:ring-4 focus:ring-brand1 lg:px-5 lg:py-2.5'
            >
              Cerrar sesión
              {/* {auth.email} -> get the user email */}
            </button>
            )}

        <button
          onClick={toggleMenu}
          type='button'
          className='inline-flex items-center rounded-lg p-2 text-sm text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 lg:hidden'
        >
          <span className='sr-only'>Open main menu</span>
          {isOpen ? <OpenIcons /> : <CloseIcons />}
        </button>
      </div>
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-[200%]'} absolute top-14 left-0 right-0 bg-brand5/80 z-10
        transition-transform duration-300 lg:static lg:translate-x-0 lg:transition-none`}
      >
        <HeaderPages />
      </div>
    </>
  )
}
export default HeaderMenu
