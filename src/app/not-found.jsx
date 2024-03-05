import Image from 'next/image'
import Link from 'next/link'

function NotFound () {
  return (
    <section className='flex min-h-screen flex-col items-center justify-center bg-brand1'>
      <h1 className='text-6xl text-brand8'>404 Error</h1>
      <h2 className='text-2xl text-brand8'>Página no encontrada</h2>
      <Image src='/logo.svg' width={100} height={100} alt='logo' className='my-10' />
      <Link href='/' className='rounded-xl border-2 border-brand6 px-4 py-2 font-semibold text-brand6 hover:bg-brand6 hover:text-brand1'>
        Ir al inicio
      </Link>
    </section>
  )
}

export default NotFound
