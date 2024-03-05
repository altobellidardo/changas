import Link from 'next/link'
import Image from 'next/image'

import { currentUser, UserButton } from '@clerk/nextjs'

async function Header () {
  const user = await currentUser()

  return (
    <header className='w-full border-b-4 bg-brand5 px-10 py-3'>
      <nav className='mx-auto flex max-w-[1000px] items-center justify-between'>
        <Link href='/' className='group flex items-center justify-center gap-2'>
          <Image src='/logo.svg' alt='logo' width={50} height={50} />
          <h1 className='text-4xl font-semibold text-brand8 group-hover:text-brand1'>
            Changas
          </h1>
        </Link>

        <ul className='flex items-center justify-center gap-4'>
          <li>
            <Link href='/nosotros' className='font-semibold text-brand8 underline-offset-4 hover:underline'>
              Nosotros
            </Link>
          </li>
          <li>
            <Link href='/contacto' className='font-semibold text-brand8 underline-offset-4 hover:underline'>
              Contacto
            </Link>
          </li>
        </ul>

        {user
          ? <UserButton />
          : (
            <div className='flex gap-4'>
              <Link href='/sign-in' className='font-semibold text-brand8 underline-offset-4 hover:underline'>
                Iniciar Sesion
              </Link>
              <Link href='/sign-up' className='font-semibold text-brand8 underline-offset-4 hover:underline'>
                Registrarse
              </Link>
            </div>
            )}
      </nav>
    </header>
  )
}

export default Header
