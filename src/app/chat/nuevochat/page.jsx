import Form from '../components/Form'
import { getExistingChat } from '@/actions/getExistingChat'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function CreateChatPage ({ searchParams }) {
  // Retrieve params from query
  const IdUser1 = searchParams.IdUser1
  const IdUser2 = searchParams.IdUser2
  const { IdChat, count } = await getExistingChat(IdUser1, IdUser2)

  if (count === 1) {
    redirect(`/chat/${IdChat.id_chat}`)
  }
  return (
    <div className='h-screen bg-gray-200 flex flex-col'>
      <h1>Chatear con: {IdUser2}</h1>
      <Form IdChat={undefined} IdUser1={IdUser1} IdUser2={IdUser2} />
    </div>
  )
}
