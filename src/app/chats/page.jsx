import Link from 'next/link'
import { getUserChats } from '@/actions/getUserChats'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'

export default async function ChatsHome () {
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  // Retrieve data from JWT
  const { id_user: IdUser } = isAuthenticated

  const userChats = await getUserChats(IdUser)
  return (
    <div>
      <div className='max-w-xl mx-auto border rounded-lg p-10 mt-32'>
        <h1 className='text-4xl font-semibold text-center'>Bienvenido al chat...</h1>
      </div>
      <div>
        {
        userChats.map((item) => (
          <Link href={`/chats/${item.id_chat}`} key={item.id_chat}>Continuar hablando con {
            item.id_user1 === IdUser ? item.id_user2 : item.id_user1
}
          </Link>
        ))
        }

      </div>
    </div>
  )
}