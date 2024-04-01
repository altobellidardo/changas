import Form from '../components/Form'
import ChatComponent from '../components/Chat'
import { getMessages } from '@/actions/getMessages'

export const dynamic = 'force-dynamic'

export default async function Chathomepage ({ params }) {
  const { IdChat } = params

  const data = await getMessages(IdChat)
  return (
    <div className='h-screen bg-gray-200 flex flex-col'>
      <h1>Este es el chat: {IdChat}</h1>
      <ChatComponent data={data} IdChat={IdChat} />
      <Form IdChat={IdChat} />
    </div>
  )
}
