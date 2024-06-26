import Link from 'next/link'
import { usePathname } from 'next/navigation'

const enablePath = 'block rounded py-2 pl-3 pr-4 text-brand8 lg:bg-transparent lg:p-0'
const disablePath = 'block py-2 pl-3 pr-4 text-brand1 hover:text-brand8 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-white'

function HeaderPages () {
  const pathname = usePathname()
  return (
    <ul className='flex flex-col lg:flex-row lg:gap-8'>
      <li>
        <Link href='/' className={pathname === '/' ? enablePath : disablePath}>
          Inicio
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
