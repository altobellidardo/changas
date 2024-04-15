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
      className='flex gap-2 font-semibold px-4 py-4 border-b-2 border-brand5'
      href={`/chats/${info.id_chat}`}
    >
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
        {
          visto
            ? 'Visto'
            : 'No visto'
        }
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
        <div className='bg-gray-500 px-2 py-4'>
          <h1 className='text-3xl font-bold'>Chats</h1>
          <div>
            <input type='text' className='rounded-md' />
          </div>
        </div>
        <div>
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
