import Footer from '@/components/footer'
import Header from '@/components/header/header'
import { sendEmail } from '@/libs/resend/email'
import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'

function EliminarCuenta () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (isAuthenticated) {
    async function sendEmailDeleteUser () {
      'use server'

      await sendEmail({
        from: 'equipo@changasred.com',
        to: 'equipo@changasred.com',
        subject: 'Petición de eliminación de cuenta',
        html: `<p>Se requiere eliminar la cuenta, email: ${isAuthenticated.email}   ID: ${isAuthenticated.id_user}</p>`
      })

      console.log('Email enviado')
    }

    return (
      <main className='flex min-h-screen flex-col bg-brand8 justify-between'>
        <Header />
        <p className='font-bold text-xl mx-auto'>
          Estas a punto de eliminar tu cuenta. Por favor confirma que deseas hacerlo. La eliminación de la cuenta puede demorar hasta 7 días hábiles, por lo que puede ser que sigas podiendo iniciar sesión e interactuar en la plataforma. Para conocer más información sobre como es que eliminamos tu cuenta y tus datos visita
          <a className='text-blue-500 underline' href='/legal/privacidad'> nuestra Política de Privacidad</a>
        </p>
        <form action={sendEmailDeleteUser} className='flex w-full'>
          <button type='submit' className='text-red-600 bg-red-200 border-2 rounded-lg p-2 border-red-600 max-w-[600px] text-center mx-auto'>Eliminar cuenta</button>
        </form>
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
