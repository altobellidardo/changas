/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { getUser } from '@/actions/getUser'

function Card ({ name, link }) {
  return (
    <Link
      href={link}
      className='font-semibold underline-offset-2 hover:underline hover:bg-brand5/40 border-2 border-brand5 bg-brand5/20 rounded-xl px-4 py-8 text-center'
    >
      {name}
    </Link>
  )
}

async function Home ({ IdUser }) {
  const user = await getUser(IdUser)
  user.picture = user.picture != null ? user.picture : 'https://avatar.iran.liara.run/public/boy?username=' + user.name
  return (
    <>
      <section className='pt-20 md:pt-32 px-4'>
        <div className='md:flex md:w-[80vw] max-w-[1200px] mx-auto'>
          <h1 className='text-3xl'>Bienvenido <br />{user.name} {user.surname}</h1>
          <img src={user.picture} alt={user.name} className='size-36 rounded-full object-cover my-4 border-2 border-brand1 mx-auto' />
        </div>
      </section>

      <section className='grid grid-cols-1 gap-4 md:grid-cols-2 w-[80vw] max-w-[1200px] mx-auto my-10'>
        <Card name='Encontrar servicios' link='/contratar' />
        <Card name='Encontrar trabajo' link='/postularse' />
        <Card name='Ir a tu perfil' link='/perfil' />
        <Card name='Ir a los chats' link='/chats' />
      </section>
    </>
  )
}

export default Home
