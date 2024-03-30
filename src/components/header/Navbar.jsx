'use client'
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import { useState } from 'react'
import OpenIcon from '../icons/OpenIcon'
import CloseIcon from '../icons/CloseIcon'
import HeaderPages from './HeaderPages'

function Navbar ({ auth }) {
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
      <header className='h-[60px]'>
        <nav className='bg-brand5 z-50 w-full absolute px-4 py-2.5 lg:px-6 flex justify-between items-center max-w-[1200px] mx-auto'>
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
              {isOpen ? <OpenIcon /> : <CloseIcon />}
            </button>
          </div>
          <div className='hidden lg:block'>
            <HeaderPages />
          </div>
        </nav>
      </header>

      <div
        className={`
        ${isOpen ? 'translate-y-0' : '-translate-y-[200%]'} absolute top-14 left-0 right-0 bg-brand5 z-10 pl-2 pb-4
        transition-transform duration-300 lg:hidden`}
      >
        <HeaderPages />
      </div>
    </>
  )
}

export default Navbar
