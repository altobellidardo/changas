import Footer from '@/components/footer'
import Header from '@/components/header/header'
import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'
import DeleteForm from './form'

function EliminarCuenta () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (isAuthenticated) {
    return (
      <main className='flex min-h-screen flex-col bg-brand8 justify-between'>
        <Header />
        <p className='font-bold text-md md:text-xl mx-auto max-w-[80vw]'>
          Estas a punto de eliminar tu cuenta. Por favor confirma que deseas hacerlo. La eliminación de la cuenta puede demorar hasta 7 días hábiles, por lo que puede ser que sigas podiendo iniciar sesión e interactuar en la plataforma. Para conocer más información sobre como es que eliminamos tu cuenta y tus datos visita
          <a className='text-blue-500 underline' href='/legal/privacidad'> nuestra Política de Privacidad</a>
        </p>
        <DeleteForm user={isAuthenticated} />
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
