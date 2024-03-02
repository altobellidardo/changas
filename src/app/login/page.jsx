import Link from 'next/link'
import Header from '@/components/header'
import LoginForm from './loginForm'

function LonginPage () {
  return (
    <main className='min-h-screen bg-brand8'>
      <Header />

      <section className='w-full max-w-[1000px] mx-auto mt-10'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Acceda a tu cuenta</h1>
        </div>
        <LoginForm />
        <p className='text-center'>si no tienes una cuenta, puedes
          <Link href='/register' className='p-1 font-semibold hover:text-brand6'>Registrarse</Link>
        </p>
      </section>
    </main>
  )
}

export default LonginPage
