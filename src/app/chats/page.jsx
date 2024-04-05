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
    <div className='p-4'>
      <h1>Bienvenido al chat... {'\n\n\n\n\n\n\n\n\n\n\n\n'}</h1>
      <div>
        {
          userChats.map((item) => (
            <Link href={`/chats/${item.id_chat}`} key={item.id_chat}>Continuar hablando con {
              item.id_user1 === IdUser ? item.username_2 : item.username_1
            }
            </Link>
          ))
        }
      </div>
    </div>
  )
}
