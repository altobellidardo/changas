import Link from 'next/link'
import Image from 'next/image'

function Header () {
  return (
    <header className='w-full bg-brand5 px-10 py-3 border-b-4'>
      <nav className='flex justify-between items-center max-w-[1000px] mx-auto'>
        <Link href='/' className='flex gap-4 justify-center items-center group '>
          <Image src='/logo.svg' alt='logo' width={50} height={50} className='group-hover:rotate-3' />
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
      </nav>
    </header>
  )
}

export default Header
