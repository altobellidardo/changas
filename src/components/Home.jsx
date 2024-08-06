/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { getUser } from '@/actions/getUser'
import { getPicURL } from '@/utils/picture'
import Tooltip from './ui/Tooltip'

function Card ({ name, link, description }) {
  return (
    <div className='relative group'>
      <Link
        href={link}
        className='font-semibold underline-offset-2 hover:underline hover:bg-brand5/40 border-2 border-brand5 bg-brand5/20 rounded-xl px-4 py-8 text-center block'
      >
        {name}
      </Link>
      {description && <Tooltip text={description} />}
    </div>
  )
}

async function Home ({ IdUser }) {
  const user = await getUser(IdUser)
  const picURL = getPicURL(user)

  return (
    <>
      <section className='pt-20 md:pt-32 px-4'>
        <div className='md:flex md:w-[80vw] max-w-[1200px] mx-auto'>
          <h1 className='text-3xl'>Bienvenido <br />{user.name} {user.surname}</h1>
          <img src={picURL} alt={user.name} className='size-36 rounded-full object-cover my-4 border-2 border-brand1 mx-auto' />
        </div>
      </section>

      <section className='grid grid-cols-1 gap-4 md:grid-cols-2 w-[80vw] max-w-[1200px] mx-auto my-10'>
        <Card name='Contratar servicios' description='Encuentra al proveedor de servicios que estas buscando' link='/contratar' />
        <Card name='Encontrar trabajos' description='Explora las ofertas de trabajo que los usuarios publicaron' link='/postularse' />
        <Card name='Ir a tu perfil' description='Carga tus oficios para que otros usuarios los vean o anuncia servicios que busques' link='/perfil' />
        <Card name='Ir a los chats' link='/chat' />
      </section>
    </>
  )
}

export default Home
