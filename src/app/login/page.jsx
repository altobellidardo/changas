import Link from 'next/link'
import Header from '@/components/header'

function LonginPage () {
  return (
    <main className='min-h-screen bg-brand8'>
      <Header />

      <section className='w-full max-w-[1000px] mx-auto mt-10'>
        <header className='flex gap-10 items-center'>
          <div>
            <h1 className='text-2xl font-semibold'>Acceda a tu cuenta</h1>
            <p>si no tienes una cuenta, puedes registrarte</p>
          </div>
          <Link href='/register' className='font-semibold border-2 border-brand6 text-brand6 rounded-xl px-4 py-2 hover:text-brand1 hover:bg-brand6'>Registrarse</Link>
        </header>
      </section>
    </main>
  )
}

export default LonginPage
