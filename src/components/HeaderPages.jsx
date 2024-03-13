'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const enablePath = 'bg-primary-700 lg:text-primary-700 block rounded py-2 pl-3 pr-4 text-white lg:bg-transparent lg:p-0'
const disablePath = 'lg:hover:text-primary-700 block py-2 pl-3 pr-4 text-gray-300 hover:bg-gray-700 hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-white'

function HeaderPages () {
  const pathname = usePathname()
  return (
    <ul className='mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8'>
      <li>
        <Link href='/' className={pathname === '/' ? enablePath : disablePath} aria-current='page'>
          Home
        </Link>
      </li>
      <li>
        <Link href='/nosotros' className={pathname === '/nosotros' ? enablePath : disablePath}>
          Nosotros
        </Link>
      </li>
      <li>
        <Link href='/contacto' className={pathname === '/contacto' ? enablePath : disablePath}>
          Contacto
        </Link>
      </li>
    </ul>
  )
}

export default HeaderPages
