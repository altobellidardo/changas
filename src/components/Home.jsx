/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Header from './header/header'
import { getUser } from '@/actions/getUser'

async function Home ({ IdUser }) {
  const user = await getUser(IdUser)
  user.picture = user.picture != null ? user.picture : 'https://avatar.iran.liara.run/public/boy?username=' + user.name
  return (
    <main>
      <Header />

      <section className='pt-20 md:pt-32 px-4'>
        <div className='md:flex md:max-w-[50vw] md:mx-auto'>
          <h1 className='text-3xl'>Bienvenido <br />{user.name} {user.surname}</h1>
          <img src={user.picture} alt={user.name} className='size-36 rounded-full object-cover my-4 border-2 border-brand1 mx-auto' />
        </div>
        <Link className='bg-brand5 px-8 py-2 rounded-xl text-brand8 block w-fit md:ml-40' href='/perfil'>
          Ir a tu perfil
        </Link>
        <Link className='bg-brand5 px-8 py-2 rounded-xl text-brand8 block w-fit md:ml-40 mt-4' href='/auth/change-password'>
          Cambiar contraseña
        </Link>
      </section>
    </main>
  )
}

export default Home
