import { getUserChats } from '@/actions/getUserChats'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import Header from '@/components/header/header'
import Footer from '@/components/footer'
import ChatBox from './components/ChatBox'

export const dynamic = 'force-dynamic'

export default async function ChatsHome () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  // Retrieve data from JWT
  const { id_user: IdUser } = isAuthenticated

  const userChats = await getUserChats(IdUser)

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <section className='bg-brand5 px-4 md:px-20 pt-4 md:pt-8 pb-8'>
        <div className='max-w-[1200px] mx-auto md:flex md:gap-4 items-center'>
          <h1 className='text-3xl text-white'>Chats</h1>
          <input
            type='text'
            className='bg-brand3 text-brand8 my-2 rounded-md px-4 py-2 text-sm w-full opacity-50 focus:opacity-100 focus:outline-none'
            placeholder='Buscar'
          />
        </div>
      </section>

      <section className='my-4 md:my-10 flex-grow'>
        {userChats.length === 0
          ? (
            <div className='flex flex-col items-center'>
              <span className='text-black font-bold text-xl py-10'>
                No has iniciado ninguna conversación
              </span>
            </div>
            )
          : userChats.map(item => <ChatBox key={item.id_chat} info={item} IdUser={IdUser} />)}
      </section>

      <Footer />
    </div>
  )
}
