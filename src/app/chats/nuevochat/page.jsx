import Form from '../components/Form'
import { getExistingChat } from '@/actions/getExistingChat'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import checkUser from '@/utils/checkUser'

export const dynamic = 'force-dynamic'

export default async function CreateChatPage ({ searchParams }) {
  // Retrieve params from query and cookie
  const token = cookies().get('token')
  const isAuthenticated = checkUser(token?.value)
  if (!isAuthenticated) redirect('/')
  const { id_user: IdUser1, username: Username } = isAuthenticated

  const IdUser2 = searchParams.IdUser2
  const Username2 = searchParams.Username2

  const { IdChat, count } = await getExistingChat(IdUser1, IdUser2)

  if (count === 1 || IdUser1 === IdUser2) {
    redirect(`/chats/${IdChat.id_chat}`)
  }

  return (
    <div className='h-screen bg-gray-200 flex flex-col'>
      <h1>Chatear con: {Username2}</h1>
      <Form IdChat={undefined} IdUser={IdUser1} OtherUser={IdUser2} Username={Username} Username2={Username2} />
    </div>
  )
}
