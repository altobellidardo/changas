import checkUser from '@/utils/checkUser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Header from '@/components/header/header'
import Footer from '@/components/footer'
import ChatsList from './chatList'

export const dynamic = 'force-dynamic'

function Chat () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  // Retrieve data from JWT
  const { id_user: idUser } = isAuthenticated

  if (!isAuthenticated) {
    redirect('/')
  }

  return (
    <main className='flex flex-col min-h-screen'>
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

      <ChatsList idUser={idUser} />

      <Footer />
    </main>
  )
}

export default Chat
