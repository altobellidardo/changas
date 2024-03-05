import Link from 'next/link'
import Image from 'next/image'

import { currentUser, UserButton } from '@clerk/nextjs'

async function Header () {
  const user = await currentUser()

  return (
    <header className='w-full bg-brand5 px-10 py-3 border-b-4'>
      <nav className='flex justify-between items-center max-w-[1000px] mx-auto'>
        <Link href='/' className='flex gap-2 justify-center items-center group '>
          <Image src='/logo.svg' alt='logo' width={50} height={50} />
          <h1 className='text-4xl font-semibold text-brand8 group-hover:text-brand1'>
            Changas
          </h1>
        </Link>

        <ul className='flex gap-4 justify-center items-center'>
          <li>
            <Link href='/nosotros' className='text-brand8 font-semibold hover:underline underline-offset-4'>
              Nosotros
            </Link>
          </li>
          <li>
            <Link href='/contacto' className='text-brand8 font-semibold hover:underline underline-offset-4'>
              Contacto
            </Link>
          </li>
        </ul>

        {user
          ? <UserButton />
          : (
            <div className='flex gap-4'>
              <Link href='/sign-in' className='text-brand8 font-semibold hover:underline underline-offset-4'>
                Iniciar Sesion
              </Link>
              <Link href='/sign-up' className='text-brand8 font-semibold hover:underline underline-offset-4'>
                Registrarse
              </Link>
            </div>
            )}
      </nav>
    </header>
  )
}

export default Header
