import Footer from '@/components/footer'
import Header from '@/components/header/header'
import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'

function EliminarCuenta () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (isAuthenticated) {
    return (
      <main className='flex min-h-screen flex-col bg-brand8 justify-between'>
        <Header />
        <button className='text-brand8 mb-2 bg-brand4 p-2 rounded-full hover:bg-brand5'>Eliminar cuenta</button>
        <Footer />
      </main>
    )
  } else {
    return (
      <main className='flex min-h-screen flex-col bg-brand8 justify-between'>
        <Header />
        <p className='text-xl font-bold w-full text-center'>Para poder eliminar tu cuenta, debes iniciar sesión.</p>
        <Footer />
      </main>
    )
  }
}

export default EliminarCuenta
