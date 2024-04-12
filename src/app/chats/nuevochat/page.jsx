import Form from '../components/Form'
import { getExistingChat } from '@/actions/getExistingChat'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function CreateChatPage ({ searchParams }) {
  // Retrieve params from query
  const IdUser1 = searchParams.IdUser1
  const IdUser2 = searchParams.IdUser2
  const Username2 = searchParams.Username2

  const { IdChat, count } = await getExistingChat(IdUser1, IdUser2)

  if (count === 1 || IdUser1 === IdUser2) {
    redirect(`/chats/${IdChat.id_chat}`)
  }

  return (
    <div className='h-screen bg-gray-200 flex flex-col'>
      <h1>Chatear con: {Username2}</h1>
      <Form IdChat={undefined} IdUser={IdUser1} OtherUser={IdUser2} Username2={Username2} />
    </div>
  )
}
