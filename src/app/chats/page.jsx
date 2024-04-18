import Link from 'next/link'
import { getUserChats } from '@/actions/getUserChats'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'
import Header from '@/components/header/header'
import Footer from '@/components/footer'
import convertToLocal from '@/utils/convertToLocal'

function ChatBox ({ info, IdUser }) {
  let lastMessageDate = new Date(info.last_message)
  lastMessageDate = convertToLocal(lastMessageDate)
  const day = lastMessageDate.getDate()
  const month = lastMessageDate.getMonth() + 1
  const year = lastMessageDate.getFullYear()
  const lastMessageStr = `${day}/${month}/${year}`

  const visto = info.id_user1 === IdUser ? info.read_user_1 : info.read_user_2

  return (
    <Link
      key={info.id_chat}
      className='block w-full px-2 py-4 font-semibold border-b-2 last:border-0 border-brand5 hover:bg-brand2/20'
      href={`/chats/${info.id_chat}`}
    >
      <div className='flex justify-between items-center max-w-[80%] mx-auto'>
        <div className='size-16 rounded-full bg-brand5'>Image</div>
        <div className='flex flex-col'>
          <span>
            {info.id_user1 === IdUser ? info.username_2 : info.username_1}
          </span>
          <span>
            Último mensaje {lastMessageStr}
          </span>
        </div>

        <div>
          {visto ? 'Visto' : 'No visto'}
        </div>
      </div>
    </Link>
  )
}

export default async function ChatsHome () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  // Retrieve data from JWT
  const { id_user: IdUser } = isAuthenticated

  const userChats = await getUserChats(IdUser)

  return (
    <main className='min-h-screen'>
      <Header />
      <section className=''>
        <div className='bg-brand5 px-20 pt-4 pb-8'>
          <h1 className='text-5xl text-white'>Chats</h1>
          <div className='flex justify-between gap-4'>
            <input type='text' className='bg-brand3 text-brand8 my-2 rounded-md px-2 py-1 text-sm w-full opacity-50 focus:opacity-100 focus:outline-none' placeholder='Buscar' />
            <button className='rounded-md px-2 py-1 text-sm hover:bg-brand3'>
              Filtros
            </button>
          </div>
        </div>
        <div className='my-10'>
          {
            userChats.map((item) => (
              <ChatBox key={item.id_chat} info={item} IdUser={IdUser} />
            ))
          }
        </div>
      </section>
      <Footer />
    </main>
  )
}
