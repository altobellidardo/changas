/* eslint-disable @next/next/no-img-element */
import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_USERS = ['altobellidardo@gmail.com']

// obtener imagenes y token

function Admin () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  // Retrieve data from JWT
  const { email: userEmail } = isAuthenticated

  if (!isAuthenticated || !ADMIN_USERS.includes(userEmail)) {
    redirect('/')
  }

  return (
    <main className='flex min-h-screen flex-col bg-brand8'>
      <h1>Welcome, {userEmail}</h1>

      <section className='flex gap-8 mx-auto mt-20'>
        <div className='w-[40vw]'>
          <img src='https://via.placeholder.com/1920x1080' alt='' />
        </div>
        <div className='w-[40vw]'>
          <img src='https://via.placeholder.com/1920x1080' alt='' />
        </div>
      </section>

      <section className='flex gap-8 mx-auto mt-10'>
        <button
          className='border border-brand3 bg-brand4/30 text-brand3 px-4 py-2 font-bold rounded-md hover:bg-brand4/50'
        >Aceptar
        </button>
        <button
          className='border border-red-500 bg-red-200/30 text-red-500 px-4 py-2 font-bold rounded-md hover:bg-red-500/50'
        >Rechazar
        </button>
      </section>
    </main>
  )
}

export default Admin
