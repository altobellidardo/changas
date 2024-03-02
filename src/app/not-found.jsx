import Image from 'next/image'
import Link from 'next/link'

function NotFound () {
  return (
    <section className='min-h-screen flex flex-col justify-center items-center bg-brand1'>
      <h1 className='text-6xl text-brand8'>404 Error</h1>
      <h2 className='text-2xl text-brand8'>Página no encontrada</h2>
      <Image src='/logo.svg' width={100} height={100} alt='logo' className='my-10' />
      <Link href='/' className='font-semibold border-2 border-brand6 text-brand6 rounded-xl px-4 py-2 hover:text-brand1 hover:bg-brand6'>
        Ir al inicio
      </Link>
    </section>
  )
}

export default NotFound
